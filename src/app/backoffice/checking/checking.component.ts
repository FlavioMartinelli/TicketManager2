import { Component, ViewChild } from '@angular/core';
import { BarcodeFormat, Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { TicketInfo } from 'src/app/models/models';

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.scss']
})
export class CheckingComponent {

  allowedFormats = [BarcodeFormat.QR_CODE]

  // enabelScanner = false
  // @ViewChild('scanner', {static:false}) scanner!:ZXingScannerComponent;
  // selectedDevice!:MediaDeviceInfo

  checking = false

  ticketInfo:TicketInfo|null = null

  constructor() {}

  //SCANNER

  handleScanSuccess(e:any){
    console.log(e);
    this.ticketInfo = {
        passenger: {
          name: "Flavio",
          last_name: "Martinelli",
          email: "flaviofm99@gmail.com",
          tel: "3450163862"
        },
        extras: [
          {
            name: "Giovanni",
            last_name: "Rago",
            email: "giorago@gmail.com",
            tel: "3990123456"
          },
          {
            name: "Giovanni",
            last_name: "Rago",
            email: "giorago@gmail.com",
            tel: "3990123456"
          },
          {
            name: "Giovanni",
            last_name: "Rago",
            email: "giorago@gmail.com",
            tel: "3990123456"
          },
          {
            name: "Giovanni",
            last_name: "Rago",
            email: "giorago@gmail.com",
            tel: "3990123456"
          },
          {
            name: "Giovanni",
            last_name: "Rago",
            email: "giorago@gmail.com",
            tel: "3990123456"
          }
        ],
        date: {
            year: 2023,
            day: 10,
            month: 3,
            time: "9:00"
        }
    }
  }

  handleCamerasNotFound(e:any) {
    console.warn(e);
  }

  //INFO
  detachTicket() {
    this.ticketInfo = null
  }

  validate(b:boolean) {
    alert(b ? "Ticket convalidato" : "Ticket rifiutato")
    this.ticketInfo = null
  }

  // ngAfterViewInit() {
  //   this.scanner.camerasFound.subscribe((devices)=>{
  //     const videoDevices:MediaDeviceInfo[] = []
  //     for(const d of devices) {
  //       if(d.kind.toString() === 'videoinput') {
  //         videoDevices.push(d)
  //       }
  //     }
  //     if(videoDevices.length > 0) {
  //       this.selectedDevice = videoDevices[0]
  //       for (const d of videoDevices) {
  //         if(d.label.toLocaleLowerCase().includes("back")){
  //           this.selectedDevice = d
  //           break;
  //         }
  //       }
  //     }
  //   })
  // }


}
