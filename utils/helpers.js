import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'QUIZ_NOTIFY'

export const shuffleQuestions = (array) => {
  let counter = array.length

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter)
        counter--
        let temp = array[counter]
        array[counter] = array[index]
        array[index] = temp
    }

    return array
}


export const clearLocalNotifications = () =>  
  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationAsync)


const createNotification = () => ({
  title: 'Take a quiz',
  body: 'Don\'t forget to take a quiz today!',
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: high,
    sticky: false, 
    vibrate: true
  }
})

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.serHours(14) 
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification,
                {
                  time: tomorrow, 
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export const textInputStyle = { 
  height: 40, 
  fontSize: 22, 
  marginBottom: 20, 
  textAlign: 'center', 
  borderBottomWidth: 1 , 
  borderBottomColor: 'gray' 
}