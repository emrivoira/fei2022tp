import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        icons:{
            iconfont:"mdi",
        },
        options: {
            customProperties: true,
        },
        themes:{
            light:{
                primary: '#10396d',
                secondary: '#6194af',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                purple: '#6A76AB',
                btnCancel: '#DF1100',
                greyDark: '#4F4F54',
                greyClear:'#999BA3',
                
            },
        },
    },
});
