import webpush from 'web-push';

const vapid = {
    "publicKey": "BB7JNdT0bNwVdQBRM0BM_0xHQAtN_2QTM7aIU17nLWv2ljDV18_VOzkjyWbW4viUiCRr-Zf_N3X07EdHmUVwYtM",
    "privateKey": "0_0fgAgLXJRmfpl-1sUwq1qGHFdMyDf6O9U1RWd3eMM"
}

export default (): void => {
    webpush.setVapidDetails(
        'mailto:moin@pct-digital.de',
        vapid.publicKey,
        vapid.privateKey
    );
}
