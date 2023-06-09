import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { OgrenciBasvuruDurumEnum } from 'src/app/Model/Enums/OgrenciBasvuruDurum.enum';
import { OgrenciDurumEnum } from 'src/app/Model/Enums/OgrenciDurum.enum';
import { OgrenciSinavDurumEnum } from 'src/app/Model/Enums/OgrenciSinavDurum.enum';
import { OgrenciYerlesmeDurumEnum } from 'src/app/Model/Enums/OgrenciYerlesmeDurum.enum';

import { StatusDisplayEnum } from '../../StatusDisplay.enum';


@Component({
  selector: 'kt-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements AgRendererComponent {

  cellValue:any;
  cellEditorParams: any = StatusDisplayEnum.pasifAktif;
  constructor() { }
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {

    this.cellValue = this.getValueToDisplay(params);
    //  console.log('params.colDef ',params.colDef)
    // if (params??.colDef.cellEditorParams) {
    //   this.cellEditorParams = params??params.colDef?.cellEditorParams.values;
    // }

    //console.log('cellEditorParams ',this.cellEditorParams);
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }


  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  getItemCssClassByStatus(status:any): string {

    if (StatusDisplayEnum.ogrenciYerlesmeDurumlari == this.cellEditorParams) {
      if (status == OgrenciYerlesmeDurumEnum.yerlesti)
        return 'success';
      if (status == OgrenciYerlesmeDurumEnum.yerlesmedi)
        return 'metal';
      if (status == OgrenciYerlesmeDurumEnum.hak_iptal)
        return 'danger';
    }

    if (StatusDisplayEnum.ogrenciBasvuruDurumlari == this.cellEditorParams) {

      if (status == OgrenciBasvuruDurumEnum.yeni_kayit)
        return 'warning';
      if (status == OgrenciBasvuruDurumEnum.ogrenci_onayladi)
        return 'level-one-success';
      if (status == OgrenciBasvuruDurumEnum.yonetici_onayladi)
        return 'level-second-success';
      if (status == OgrenciBasvuruDurumEnum.red)
        return 'danger';
    }
    if (status == -1)
      return 'warning';
    if (status == 0 || status==false)
      return 'danger';
    if (status == 1 || status==true)
      return 'success';
    if (status == 2)
      return 'metal';
      if (status == 3)
      return 'warning';

    return '';
  }

  /**
   * Returns Item Status in string
   * @param status: number
   */
  getItemStatusString(status: number = 0): string {

    if (StatusDisplayEnum.pasifAktif == this.cellEditorParams) {
      if (status == 0)
        return 'TEXT.PASSIVE';
      if (status == 1)
        return 'TEXT.ACTIVE';
      if (status == 3)
        return 'Suspended';
      if (status == 2)
        return 'Pending';
    }
    if (StatusDisplayEnum.trueFalse == this.cellEditorParams) {
      if (status == 0)
        return 'TEXT.FALSE';
      if (status == 1)
        return 'TEXT.TRUE';
    }
    if (StatusDisplayEnum.onceSonra == this.cellEditorParams) {
      if (status == 0)
        return 'TEXT.FALSE';
      if (status == 1)
        return 'TEXT.TRUE';
    }
    if (StatusDisplayEnum.onlineDekont == this.cellEditorParams) {
      if (status == 0)
        return 'TEXT.odeme_istenmiyor';
      if (status == 1)
        return 'TEXT.online';
      if (status == 2)
        return 'TEXT.dekont';
    }

    if (StatusDisplayEnum.basvuruTurleri == this.cellEditorParams) {
      if (status == 1)
        return 'TEXT.sinav';
      if (status == 2)
        return 'TEXT.lisans';
      if (status == 3)
        return 'TEXT.yuksek_lisans';
      if (status == 4)
        return 'TEXT.doktora';
    }

    if (StatusDisplayEnum.ogrenciDurumlari == this.cellEditorParams) {
      if (status == OgrenciDurumEnum.pasif)
        return 'TEXT.PASSIVE';
      if (status ==  OgrenciDurumEnum.aktif)
        return 'TEXT.ACTIVE';
      if (status ==  OgrenciDurumEnum.basvuru_yapamaz)
        return 'TEXT.basvuru_yapamaz';
      if (status ==  OgrenciDurumEnum.engellendi)
        return 'TEXT.engellendi';
    }

    if (StatusDisplayEnum.ogrenciBasvuruDurumlari == this.cellEditorParams) {
      if (status == OgrenciBasvuruDurumEnum.yeni_kayit)
        return 'TEXT.yeni_kayit';
      if (status == OgrenciBasvuruDurumEnum.ogrenci_onayladi)
        return 'TEXT.ogrenci_onayladi';
      if (status == OgrenciBasvuruDurumEnum.yonetici_onayladi)
        return 'TEXT.yonetici_onayladi';
      if (status == OgrenciBasvuruDurumEnum.red)
        return 'TEXT.red';
    }


    if (StatusDisplayEnum.ogrenciYerlesmeDurumlari == this.cellEditorParams) {
      if (status == OgrenciYerlesmeDurumEnum.yerlesti)
        return 'TEXT.yerlesti';
      if (status == OgrenciYerlesmeDurumEnum.yerlesmedi)
        return 'TEXT.yerlesmedi';
      if (status == OgrenciYerlesmeDurumEnum.hak_iptal)
        return 'TEXT.hak_iptal';
    }

    if (StatusDisplayEnum.ogrenciSinavDurumlari == this.cellEditorParams) {
      if (status == OgrenciSinavDurumEnum.sinav_henuz_gerceklesmedi)
        return 'TEXT.sinav_henuz_gerceklesmedi';
      if (status == OgrenciSinavDurumEnum.sinav_girmedi)
        return 'TEXT.sinav_girmedi';
      if (status == OgrenciSinavDurumEnum.sinav_girdi)
        return 'TEXT.sinav_girdi';
      if (status == OgrenciSinavDurumEnum.sinav_reddedildi)
        return 'TEXT.sinav_reddedildi';
    }

    return '';
  }
}
