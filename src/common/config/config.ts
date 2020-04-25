interface Config {
    logo: string;
    env: string;
}

const config: Config = {
    // logo配置
    logo: 'UNI-ADMIN',
    env: process.env.NODE_ENV
};

export default config;
