// "use strict";

// import languageStore from "scripts/stores/LanguageStores";

// var LanguageMixin = {

//     getInitialState() {
//         this.languageStore = this.context.flux.getStore('language');
//         this.languageAction = this.context.flux.getActions('language');

//         return {
//             lang: this.languageStore.getLang() || {lang: "eng"}
//         };
//     },

//     componentDidMount() {
//         this.languageStore.addListener('change', this.onLanguageChange);
//     },

//     componentWillUnmount() {
//         this.languageStore.removeListener('change', this.onLanguageChange);
//     },

//     onLanguageChange() {
//         var _data = this.languageStore.getLang();
//         this.setState({
//             lang: _data
//         });
//     },
// };

// module.exports = LanguageMixin;