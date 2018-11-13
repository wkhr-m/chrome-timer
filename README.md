# ChromeTimer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.1.

ChromeTimer is extension of chrome.

## 使い方

- ng build

- Chrome の拡張機能管理画面で、dist 配下のものを読み込む

## 参考文献

- http://tweeeety.hateblo.jp/entry/2015/03/04/231354
- https://developer.chrome.com/extensions/declare_permissions
- https://qiita.com/Yuta_Fujiwara/items/daf41429f95caec82982
- http://kenzauros.com/blog/run-something-periodically-with-event-pages-of-chrome-extension-api/
- http://tech.quartetcom.co.jp/2015/12/09/lets-develop-chrome-extension/

## 出会った問題

- popup.html がでてくるけど、中の angular の部分がでてこない
  https://stackoverflow.com/questions/42148593/google-chrome-extension-using-angular-cli-stuck-on-loadin

- background の scripts が読み込まれない
  angular.json の asset に書き忘れていた

# 心残り

background を typescript にしたかった
