import * as vscode from 'vscode';
import { BaseView } from './BaseView';
import { WebCommand } from '../common/constant/WebCommand';
import { ConfigurationUtils } from '../common/utils/ConfigurationUtils';

export class SettingWebview extends BaseView {
    public show() {
        let path = './web/setting.html';
        let title = 'Magix VSCode 插件设置';
        this.createWebview(path, title, vscode.ViewColumn.Active);
        this.onDidReceiveMessage((e) => {
            if (e.type === WebCommand.SAVE_NICKNAME) {
                ConfigurationUtils.saveNickname(e.data.nickname);
                ConfigurationUtils.saveRapType(e.data.rapType);
                this.postMessage(WebCommand.SAVE_NICKNAME, {});
            } else if (e.type === WebCommand.GET_NICKNAME) {
                let nickname = ConfigurationUtils.getNickname();
                let rapType = ConfigurationUtils.getRapType();
                this.postMessage(WebCommand.GET_NICKNAME, { nickname, rapType });
            } else if (e.type === WebCommand.CLOSE) {
                this.dispose(path);
            }
        });
       
    }
   

}