import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private local: LocalNotifications,
    private platform: Platform
    ) 
  {
      this.initialize()
  }

  initialize(){
    this.platform.ready().then(()=>{
      if(this.platform.is('mobile')){
        this.local.on('click').subscribe(data=>{
          alert('Click Pressed')
        })

        this.local.cancelAll().then(()=>{
          this.message('all notifications cancelled')
        })
      }
    })
  }

  inmediatly(){
    this.local.schedule({
      id: 0,
      title: 'Inmediatly',
      text: 'This is an Inmediatry notfication',
      data: JSON.stringify({}),
      trigger: { at: new Date(), firstAt: new Date(2018, 1, 1, 0)}
    })
  }

  seconds(){
    let e = 5;
    for (let i = 0; i < 5; i++) {
      this.local.schedule({
        id: i+1,
        title: 'Seconds',
        text: 'Notification #'+ i+1,
        data: JSON.stringify({}),
        trigger: { in: e+=5, unit: ELocalNotificationTriggerUnit.SECOND }
      })
    }
    this.message('5 notifications scheduled to trigger in five seconds')
  }

  hour(){
    let h = 22;
    for (let i = 0; i < 2; i++) {
      let hh =  new Date(2019, 0, 12, h++)
      this.local.schedule({
        id: i+ 10,
        title: 'Hour',
        text: 'Notification #'+ i+1,
        data: JSON.stringify({}),
        trigger: { at: hh }
      })
      this.message(`scheduled at ${ hh}`)
    }
    //a las 11, y 12 de la noche
  }

  day(){
    let h = 12;
    for (let i = 0; i < 2; i++) {
      let hh =  new Date(2019, 0, h++, h++)
      this.local.schedule({
        id: i+ 10,
        title: 'Day',
        text: 'Notification #'+ i+1,
        data: JSON.stringify({}),
        trigger: { at: hh }
      })
      this.message(`scheduled at ${ hh}`)
    }
    //el dia 13 a a las 1 y el dia 14 a las 2
  }
  
  count:number = -1;
  message(msg){ 
    this.local.schedule({
      id: this.count--,
      title: 'Message',
      text: msg
    })
  }



}
