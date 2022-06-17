// в state.notifications находятся объекты следующего вида (popupData): 
// {
//     message: [
//         'Текстовая строка',
//         '<span>Строка в теге</span>',
//         { node: '<a>Строка в теге. На родителя будет повешен обработчик handler на событие click</a>', handler: () => someHandler(args) }
//         ] || 'Любое значение из массива, только в виде одной строки',
//     timetolive: 3000 || Number
// }
import { generateId } from "@/assets/js/scripts";

export default {
    state: {
        notifications: []
    },
    getters: {
        notificationsList(state) {
            return state.notifications;
        }
    },
    mutations: {
        addNotification(state, popupData) {
            popupData.id = generateId();
            state.notifications.push(popupData);
        },
        removeNotification(state, id) {
            const popupDataIndex = state.notifications.findIndex(item => item.id === id);
            if(popupDataIndex >= 0) state.notifications.splice(popupDataIndex, 1);
        }
    }
}