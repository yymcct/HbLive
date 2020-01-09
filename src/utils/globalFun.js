import { wxShare } from '@/utils/wxSdk'
import { userInfoAPI } from '@/utils/auth'


export default {
    wxShare,
    userInfoAPI,
    other: {
        ImagesPathToStr(files) {
            let str = "";
            files.map(files => {
                let filePaht = files.curPathName.replace(/^http:\/\/[^/]+/, "")
                if (str == "") {
                    str = filePaht;
                } else {
                    str += `;${filePaht}`;
                }
            })

            return str;
        },
    }
}