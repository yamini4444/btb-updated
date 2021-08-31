import AsyncStorage from "@react-native-community/async-storage"

// export const getLocale = async() =>{
//     try{
//         let lang = await AsyncStorage.getItem('lang');
//         if(lang && typeof lang !== undefined  && lang.length > 0)
//            return lang;
//         else
//            return 'en'; // No Language setting, default it to english
//     }
//     catch(e) {
//         return 'en'; // can't get the language setting,default it to english
//     }
// } 

export const updateLocale = (lang) => {
    try{
        AsyncStorage.setItem('lang', lang);
    }catch(e){

    }
}