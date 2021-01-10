import { getDefaults, getI18n } from "./context";
import { ref } from "@vue/reactivity";

/**
 * 使用翻译hook
 * @param ns 命名空间
 */
export function useTranslation(ns?: string | string[]) {
  const i18n = getI18n();
  if (!i18n) {
    console.error(
      "You will need to pass in an i18next instance by using initVueI18next"
    );
  }

  const i18nOptions = { ...getDefaults(), ...i18n.options };

  /**
   * 监听语言改变事件
   */
  i18n.on("languageChanged", (lng) => {
    boundReset();
  });

  /**
   * 监听i18next加载事件
   */
  i18n.on("loaded", (loaded) => {
    if (loaded) {
      boundReset();
    }
  });

  // 预处理命名空间
  let namespaces = ns || (i18n.options && i18n.options.defaultNS);
  namespaces =
    typeof namespaces === "string"
      ? [namespaces]
      : namespaces || ["translation"];

  // 绑定 t 函数 到命名空间
  function getT() {
    return i18n.getFixedT(
      null,
      i18nOptions.fallbackNS
        ? (namespaces as string[])
        : (namespaces as string[])[0]
    );
  }

  const t = ref(getT());
  
  /**
   * 重置t函数
   */
  function boundReset() {
    t.value = getT();
  }

  return { t, i18n };
}
