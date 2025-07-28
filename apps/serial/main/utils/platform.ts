import os from 'os';

export default {
    platform: process.platform,
    username: os.userInfo()
}