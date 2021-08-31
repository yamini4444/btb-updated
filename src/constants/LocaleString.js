import LocalizedStrings from 'react-native-localization';

export let strings = new LocalizedStrings({
    en_us:{
      Home:"Home",
      boiledEgg:"Boiled egg",
      softBoiledEgg:"Soft-boiled egg",
      choice:"How to choose the egg"
    },
    en_uk:{
      Home:"Home",
      boiledEgg:"Boiled egg",
      softBoiledEgg:"Soft-boiled egg",
      choice:"How to choose the egg"
    },
    it: {
      Home:"casa",
      boiledEgg:"Uovo sodo",
      softBoiledEgg:"Uovo alla coque",
      choice:"Come scegliere l'uovo"
    }
   });

export default changeLanguage = async(language=null) =>{
  console.log('i am  at languge')
    await strings.setLanguage(language);
    console.log(strings.Home)
}  