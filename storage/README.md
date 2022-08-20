## About

Firebase storage (Google Cloud Storage) から Ajax を利用してファイルをダウンロードする際、設定を正常に行わないと CORS に引っかかってしまう。

このため、gsutil を利用して cors 許可設定を行う必要がある。

## Requirements

- gcloud (CLI)
    - glouc をインストールしていること。
- gsutil (CLI)
    [Docs](https://cloud.google.com/storage/docs/gsutil_install?hl=ja#install) を参照の上インストール。


## How to 

1. gcloud で mirin-app-2022 への認証を行う
サービスアカウント(のjson ファイル)は [コンソール](https://console.firebase.google.com/u/0/project/mirin-app-2022/settings/serviceaccounts/adminsdk?hl=ja) から作成できる。

```
$ gcloud auth activate-service-account --key-file ./mirin-app-2022-firebase-adminsdk-x6nb0-c1bcbc3646.json
 ```

 2. cors 設定 json をセットする。

 ```
$ gsutil cors set /path/to/cors.json gs://mirin-app-2022.appspot.com
 ```
