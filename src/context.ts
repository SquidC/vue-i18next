import { i18n, InitOptions, ThirdPartyModule } from "i18next";

/**
 * i18next 默认配置
 */
let defaultOptions: InitOptions = {};

/**
 * i18next 实例
 * @description 单例模式
 */
let i18nInstance: i18n;

/**
 * 设置默认配置
 * @param options
 */
export function setDefaults(options = {}) {
    defaultOptions = { ...defaultOptions, ...options };
}

/**
 * 获取默认配置
 */
export function getDefaults() {
    return defaultOptions;
}

/**
 * 设置i18next实例
 * @param instance
 */
export function setI18n(instance: i18n) {
    i18nInstance = instance;
}

/**
 * 获取i18next实例
 */
export function getI18n() {
    return i18nInstance;
}

/**
 * 初始vue-i18next
 */
export const initVueI18next: ThirdPartyModule = {
    /**
     * i18next 插件类型
     */
    type: "3rdParty",
    /**
     * i18next.use()的时候会调用init
     * @param instance i18next实例
     */
    init(instance: i18n) {
        setDefaults(instance.options);
        setI18n(instance);
    },
};
