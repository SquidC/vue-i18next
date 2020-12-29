import { getI18n } from "./context";

/**
 * 使用翻译hook
 * @param ns 命名空间
 */
export function useTranslation(ns?:  string | string[]) {
    const i18n = getI18n();
    if (!i18n) {
        console.error("You will need to pass in an i18next instance by using initVueI18next");
    }

    // const i18nOptions = { ...getDefaults(), ...i18n.options };

    // 预处理命名空间

    // 绑定 t 函数 到命名空间
    function getT() {
        return {
            t: i18n.getFixedT(null, ["translation"])
        }
    }
    const ret = {
        t: getT().t,
        i18n
    }
    return ret;
}
