import LocalizedStrings from 'react-native-localization';

export let strings = new LocalizedStrings({
  en: {
    identity: 'English',
    home: "Home",
    login: {
      'titleHead1': 'Let’s Sign You In',
      'titleHead2': 'Welcome back, you’ve been missed!',
      'email': 'Email Address',
      'password': "Password",
      'emailPlaceholder': 'Example@mail.com',
      'passwordPlaceholder': 'Enter Password',
      'rememberMe':'Remember Me',
      'forgotPassword':'Forgot Password',
      'login':'Login',
      'dontHaveAccount':"Don't have an account?",
      'signUp': 'Sign Up!',
      'or':'or',
      'signInWith':'Sign In With'
    },
    signUp: {
      'titleHead1': 'Getting Started',
      'titleHead2': 'Create an account to continue!',
      'agreeTerms':'Agree to our Terms & Conditions',
      'signUp': 'Sign Up',
      'haveAccount':"Already have an account?",
      'LogIn':' Log In!',
      'signInWith':'Sign up with:'
    },
    dobScreen:{
      'titleHead1':'Name and date of birth',
      'titleHead2':'User must be over 18 years old to use the platform',
      'firstName': 'First Name',
      'lastName': 'Last Name',
      'firstNamePlaceholder':'Nick',
      'lastNamePlaceholder':'Jonas',
      'birthday':'Birthday',
      'dobPalceholder':'DD MM YYYY',
      'confirmBtn':'Confirm'
    },
    phoneNumber:{
      'titleHead1':'Enter your phone number',
      'titleHead2':'Confrim you phone number',
      'phone': 'Phone number',
      'continue':'Continue'
    },
    otp:{
      'titleHead1':'OTP Authentication',
      'titleHead2':'An authentication code has been sent to (+84) 999 999 999',
      'phone': 'Resend OTP in 00:00',
      'continue':'Resend Code',
      'done':'Done'
      
    }
  },
  sp: {
    identity: "Spanish",
    home: "Hogar",
    login: {
      'titleHead1': 'Ingresemos',
      'titleHead2': '¡Bienvenido de nuevo, te extrañaron!',
      'email': 'Dirección de correo electrónico',
      'password': "Contraseña",
      'emailPlaceholder': 'Ingrese correo electrónico',
      'passwordPlaceholder': 'Introducir la contraseña',
      'rememberMe':'Recuérdame',
      'forgotPassword':'Has olvidado tu contraseña',
      'login':'Acceso',
      'dontHaveAccount':"¿No tienes una cuenta?",
      'signUp': '¡Inscribirse!',
      'or':'O',
      'signInWith':'Inicia sesión con'
    },
    signUp: {
      'titleHead1': 'Empezando',
      'titleHead2': '¡Crea una cuenta para continuar!',
      'agreeTerms':'Acepta nuestros términos y condiciones',
      'signUp': '¡Inscribirse',
      'haveAccount':"¿Ya tienes una cuenta?",
      'LogIn':'Acceso!',
      'signInWith':'Registrarte con:'
    },
    dobScreen:{
      'titleHead1':'Name and date of birth',
      'titleHead2':'User must be over 18 years old to use the platform',
      'fullName': 'Full Name',
      'namePlaceholder':'Nick Jonas',
      'birthday':'Birthday',
      'dobPalceholder':'DD MM YYYY',
      'confirmBtn':'Confirm'
    }
  },
  it: {
    identity: "Italian",
    home: "Casa",
    login: {
      'titleHead1': 'Ti accedi',
      'titleHead2': 'Bentornato, ci sei mancato!',
      'email': 'Indirizzo Email',
      'password': "Parola d'ordine",
      'emailPlaceholder': "Inserisci l'email",
      'passwordPlaceholder': 'Inserire la password',
      'rememberMe':'Ricordati di me',
      'forgotPassword':'Ha dimenticato la password',
      'login':'Login',
      'dontHaveAccount':"Non hai un account?",
      'signUp': 'Iscriviti!',
      'or':'o',
      'signInWith':'Accedi con'
    },
    signUp: {
      'titleHead1': 'Iniziare',
      'titleHead2': 'Crea un account per continuare!',
      'agreeTerms':'Accetta i nostri Termini e condizioni',
      'signUp': 'Iscriviti',
      'haveAccount':"Hai già un account?",
      'LogIn':'Accedere',
      'signInWith':'Iscriviti con:'
    },
    dobScreen:{
      'titleHead1':'Name and date of birth',
      'titleHead2':'User must be over 18 years old to use the platform',
      'fullName': 'Full Name',
      'namePlaceholder':'Nick Jonas',
      'birthday':'Birthday',
      'dobPalceholder':'DD MM YYYY',
      'confirmBtn':'Confirm'
    }
  }
});

export const changeLanguage = async (language = null) => {
  console.log(strings)
  await strings.setLanguage(language);
  console.log(strings.Home)
  console.log('get language', strings.getLanguage())
}

export const getMockLanguages = async () => {
  const availableLanguages = await strings.getAvailableLanguages();
  let mockData = [];
  for (let lang in availableLanguages) {
    await mockData.push(
      {
        id: lang,
        key: availableLanguages[lang],
        label: strings.getString('identity', availableLanguages[lang]),
        isSelected: false
      })
  }
  return mockData;
}