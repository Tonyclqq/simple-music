import {playMode} from '@/common/js/config'
//状态
const state = {
    //传递一个歌手叫，singer，是对象
    singer:{},
    //播放状态
    playing:false,
    //全屏
    fullScreen:false,
    //播放列表
    playlist:[],
    //顺序列表
    sequenceList:[],
    //播放模式
    mode:playMode.sequence,
    //当前音乐索引
    currentIndex:-1,
}
export default state