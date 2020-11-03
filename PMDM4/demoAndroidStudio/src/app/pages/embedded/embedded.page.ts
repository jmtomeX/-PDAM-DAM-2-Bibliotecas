import { Component } from '@angular/core';
import { setVideoPlayer } from '../../utils/util';
import { httpVideos, assetsVideos, getAssetsVideoPathes, getVideoNames } from '../../utils/video-utils';

const videoFrom: string = 'http';
/*  comment line above and uncomment line below
    to use videos from assets
*/
//const videoFrom:string = 'assets';

@Component({
    selector: 'app-embedded',
    templateUrl: 'embedded.page.html',
    styleUrls: ['embedded.page.scss'],
})
export class EmbeddedPage {
    videoList: Array<string>;
    itemId: Array<string>;
    private _videoPlayer: any = {};
    private _vpPlatform: string = 'web';
    private _results: Array<any> = [];
    private _handlerPlay: any;
    private _handlerPause: any;
    private _handlerEnded: any;
    private _handlerReady: any;
    private _handlerPlaying: any;
    private _handlerExit: any;

    private _testApiPlayerId: string = null;
    private _timer1: any;
    private _timer2: any;
    private _timer3: any;
    private _first: boolean = false;

    constructor() {
    }

    async ngAfterViewInit() {
        this.videoList = videoFrom === 'http' ? httpVideos : null;
        const player: any = await setVideoPlayer();
        this._videoPlayer = player.plugin;
        this._vpPlatform = player.platform;
        if (videoFrom === 'assets') {
            if (this._vpPlatform === 'ios') {
                this.videoList = getAssetsVideoPathes('ios', assetsVideos);
            } else if (this._vpPlatform === 'android') {
                this.videoList = getAssetsVideoPathes('android', assetsVideos);
            } else {
                this.videoList = getAssetsVideoPathes('web', assetsVideos);
            }
        }
        this._handlerPlay = this._videoPlayer.addListener('jeepCapVideoPlayerPlay', (data: any) => {
            console.log('Event jeepCapVideoPlayerPlay ', data);

        }, false);
        this._handlerPause = this._videoPlayer.addListener('jeepCapVideoPlayerPause', (data: any) => {
            console.log('Event jeepCapVideoPlayerPause ', data);
        }, false);
        this._handlerEnded = this._videoPlayer.addListener('jeepCapVideoPlayerEnded', async (data: any) => {
            console.log('Event jeepCapVideoPlayerEnded ', data);
            if (this._testApiPlayerId === data.fromPlayerId) {
                clearTimeout(this._timer3);
                clearTimeout(this._timer2);
                clearTimeout(this._timer1);
            }
        }, false);
        this._handlerExit = this._videoPlayer.addListener('jeepCapVideoPlayerExit', async (data: any) => {
            console.log('Event jeepCapVideoPlayerExit ', data)
            if (this._testApiPlayerId === data.fromPlayerId) {
                clearTimeout(this._timer3);
                clearTimeout(this._timer2);
                clearTimeout(this._timer1);
                console.log('in jeepCapVideoPlayerExit calling stopAllPlayers')
                const res: any = await this._videoPlayer.stopAllPlayers();
            }
            this._handlerPlay.remove();
            this._handlerPause.remove();
            this._handlerEnded.remove();
            this._handlerReady.remove();
            this._handlerPlaying.remove();
            this._handlerExit.remove();
        }, false);
        this._handlerReady = this._videoPlayer.addListener('jeepCapVideoPlayerReady', async (data: any) => {
            console.log('Event jeepCapVideoPlayerReady ', data)
            console.log('this._testApiPlayerId ', this._testApiPlayerId);
            console.log('data.fromPlayerId ', data.fromPlayerId);
            console.log('this._first ', this._first);

            if (this._testApiPlayerId === data.fromPlayerId && this._first) {
                // test the API
                const play = await this._videoPlayer.play({ playerId: 'bigbuckbunny720psurround' });
                console.log('play ', play)
                this._first = false;
                console.log('Playing the API this._first', this._first)
                this._timer1 = setTimeout(async () => {
                    const pause = await this._videoPlayer.pause({ playerId: 'bigbuckbunny720psurround' });
                    console.log('const pause ', pause);
                    const volume = await this._videoPlayer.getVolume({ playerId: 'bigbuckbunny720psurround' });
                    console.log('const volume ', volume);
                    const setVolume = await this._videoPlayer.setVolume({ playerId: 'bigbuckbunny720psurround', volume: .75 });
                    console.log('const setVolume ', setVolume);
                    const volume1 = await this._videoPlayer.getVolume({ playerId: 'bigbuckbunny720psurround' });
                    console.log('const volume1 ', volume1);
                    const currentTime = await this._videoPlayer.getCurrentTime({ playerId: 'bigbuckbunny720psurround' });
                    console.log('const currentTime ', currentTime);
                    const setCurrentTime = await this._videoPlayer.setCurrentTime({ playerId: 'bigbuckbunny720psurround', seektime: 420 });
                    console.log('const setCurrentTime ', setCurrentTime);
                    const currentTime1 = await this._videoPlayer.getCurrentTime({ playerId: 'bigbuckbunny720psurround' });
                    console.log('const currentTime1 ', currentTime1);
                    const setMuted = await this._videoPlayer.setMuted({ playerId: 'bigbuckbunny720psurround', muted: true });
                    console.log('const setMuted ', setMuted);
                    const muted = await this._videoPlayer.getMuted({ playerId: 'bigbuckbunny720psurround' });
                    console.log('const muted ', muted);
                    this._timer2 = setTimeout(async () => {
                        const play = await this._videoPlayer.play({ playerId: 'bigbuckbunny720psurround' });
                        console.log('const play ', play);
                        this._timer3 = setTimeout(async () => {
                            const setMuted = await this._videoPlayer.setMuted({ playerId: 'bigbuckbunny720psurround', muted: false });
                            console.log('const setMuted 1 ', setMuted);
                            const muted = await this._videoPlayer.getMuted({ playerId: 'bigbuckbunny720psurround' });
                            console.log('const muted 1 ', muted);

                        }, 10000)
                    }, 10000);

                }, 50000);

            }
        }, false);
        this._handlerPlaying = this._videoPlayer.addListener('jeepCapVideoPlayerPlaying', async (data: any) => {
            console.log('Event jeepCapVideoPlayerPlaying ', data)
        }, false);


        this.itemId = getVideoNames(this.videoList);
        const listEl: HTMLIonListElement = document.querySelector('#videos-list');
        for (let i: number = 0; i < this.itemId.length; i++) {
            const itemEl: HTMLIonItemElement = document.createElement('ion-item');
            const divEl: HTMLDivElement = document.createElement('div');
            divEl.setAttribute('id', this.itemId[i]);
            itemEl.style.setProperty('--inner-padding-top', '10px')
            itemEl.style.setProperty('--inner-padding-bottom', '10px')
            itemEl.appendChild(divEl);
            listEl.appendChild(itemEl);
            const res: any = await this._videoPlayer.initPlayer(
                {
                    mode: 'embedded', url: this.videoList[i],
                    playerId: this.itemId[i], componentTag: 'app-embedded', width: 480, height: 270
                });
            this._results = [...this._results, res];
        }

        // Tests the API for the playerId 'bigbuckbunny720psurround'
        this._testApiPlayerId = 'bigbuckbunny720psurround';
        this._first = true;
        console.log('this._first ', this._first);
    }

    async ngOnDestroy() {
        /*
                clearTimeout(this._timer3);
                clearTimeout(this._timer2);
                clearTimeout(this._timer1);
                const res:any  = await this._videoPlayer.stopAllPlayers();
        */
    }

}
