export const cardOptions = {
        // Custom classes - applied on container elements based on field's state
        classes: {
          focus: 'focus',
          invalid: 'invalid',
          empty: 'empty',
          complete: 'complete',
        },

        style: {
          // Styles for default field state
          base: {
            color: '#333',
            fontWeight: '500',
            fontFamily: 'Roboto, Segoe UI, Helvetica Neue, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
      
            ':focus': {
              color: '#424770',
            },
      
            '::placeholder': {
              color: 'transparent',
            },
      
            ':focus::placeholder': {
              color: '#7b808c',
            },
          },
      
          // Styles for invalid field state
          invalid: {
            color: '#e41029',
      
            ':focus': {
              color: '#e44d5f',
            },
            '::placeholder': {
              color: '#FFCCA5',
            },
          },
        },

        // locale
        locale: 'en',
        currency_code: "USD",
}
