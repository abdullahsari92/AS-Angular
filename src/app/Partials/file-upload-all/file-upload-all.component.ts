
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlContainer, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileResult } from 'src/app/Model/fileResult';

@Component({
	selector: 'app-file-upload-all',
	templateUrl: './file-upload-all.component.html',
	styleUrls: ['./file-upload-all.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => FileUploadAllComponent),
		multi: true
	}],
	viewProviders: [
		{
			provide: ControlContainer,
			useExisting: FormGroupDirective
		}
	]
})

export class FileUploadAllComponent implements OnInit,AfterViewInit {

	public form!: FormGroup;
	public formControl!: FormControl;
	public formContorlTypeName!: FormControl;


	public fileUploadQueue: any;
	constructor(private controlContainer: ControlContainer,
		private cdr: ChangeDetectorRef,


	) { }
	ngAfterViewInit(): void {
		if(this.imgURL)
		{
		 this.formContorlTypeName.setValue("deger");

		}
	}

	@Input() controlName!: string;
	@Input() typeName!: string;

	@Input() imgBase64: any;
	@Input() imgURL: any=null;
	@Input() multiple: boolean=true;
	@Input() height: any="180px";

	@Input() buttonName: string="TEXT.ADD_DOCUMENT";
  
 resultFiles: FileResult[] = [];
 fileResult!:FileResult;
 @Output() files: EventEmitter<FileResult[]> = new EventEmitter();
 @Output() confirm: EventEmitter<any> = new EventEmitter(); 
 @Output() close: EventEmitter<any> = new EventEmitter();
 @Output() chance: EventEmitter<any> = new EventEmitter();
 @Input() isSaveButton:boolean=true;

isStartUpload:boolean=false;

	ngOnInit(): void {

		console.log('imgURL', this.imgURL)

	

		this.form = <FormGroup>this.controlContainer.control;
		this.formControl = <FormControl>this.form.get(this.controlName);
		this.formContorlTypeName = <FormControl>this.form.get(this.typeName);

	}



	isFileControlHasError: boolean | undefined;
	uploadImage: any;

	onFileDragDrop1(FileList: any) {
		console.log('onFileDragDrop1', FileList.target.files)
		this.onFileDragDrop( FileList.target.files);

	}
	onFileDragDrop(FileList: any) {
		console.log('onFileDragDrop', FileList)

		//this.resultFiles = [];
		if (FileList && FileList[0]) {
			
			var dosyaSayisi = FileList.length

		
			if(!this.multiple)
			{
				dosyaSayisi=1;		
			}


			for (let i = 0; i < dosyaSayisi; i++) {
				const reader = new FileReader();

				let fileResult = new FileResult();
				let file = FileList[i];

				fileResult.description = file.name;
				fileResult.file_ext = file.type.split("/")[1];
				console.log('file ', file)
				console.log('fileResult',this.fileResult)
				fileResult.file_size = file.size;
				if (!file.name.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.pdf|\.xls|\.doc|\.docx|\.xlsx|\.JPEG|\.mp4)$/)) {
					this.isFileControlHasError = true;
				}
				else {
					if (file.size > 10024 * 1024 * 1) {
						this.isFileControlHasError = true;
					} else {
						this.isFileControlHasError = false;
						reader.readAsDataURL(file);
						reader.onload = () => {

							fileResult.file_data = reader.result;
							this.resultFiles.push(fileResult);
					
						this.chance.emit(true);
							console.log('this.imgUrlList', this.resultFiles)
							this.cdr.markForCheck();
							this.ChangeImg(file.type);

						};

					}
				}
			};

		}


	}
	ChangeImg(type: any): void {

		type = type.split("/")[1];
		setTimeout(() => {
			if (this.resultFiles.length) {
				this.formControl.setValue(this.resultFiles[0].file_data);
				this.formContorlTypeName.setValue(type)
			}
			else {
				if (this.imgBase64)
					this.formControl.setValue(this.imgBase64);
			}
		}, 2500);
	}



	saveAll(){

		// this.files.emit(this.resultFiles);
		// if(this.multiple)
		//   this.confirm.emit(this.resultFiles);
		//   else
		//   this.confirm.emit(this.resultFiles[0]);


		this.isStartUpload=true;
		console.log('this.resultFiles',this.resultFiles)
	this.resultFiles.forEach((element: FileResult) => {

			this.save(element);
		setTimeout(() => {    
			//element.isUpload = 1;
			}, 2000);
	                                     
	  })  
	}

	save(item:FileResult)
	{
		//item.isUpload = 0;  

	console.log('item',item)

		if( item.file_ext =="pdf")
		{

			item.file_data = item.file_data.split(",")[1];
		}
		if(item.isUpload !=1)
		{
			// this.userFilesService.upload(item).subscribe(res => {
  		
			// 	console.log('upload -save :', res)
			// 	if (res.result) { 
			// 	  item.isUpload = 1;	
			// 	  this.chance.emit(true);
	  
			// 	}
			// 	else {
			// 	  item.isUpload = 2;  
			// 	  item.errorMessage=res.error?.message;
			// 	}  
			//   });
		}

	}
	removeItem(i: any) { 

		this.resultFiles.splice(i, 1);
		this.formControl.setValue("");
		this.formContorlTypeName.setValue("");
		console.log('imgUrlList ', this.resultFiles)
	}

	removeImgURL()
	{

		this.imgURL=null;
	}
	strCat(str:string)
	{
  
	   if(str.length > 18)
	   {
		 return str.substring(0,18)  + " .."
	   }
	   else
	   {
		  return str;
	   }
  
	}

	getSize(bayt:any)
	{
	  var kb = bayt/1024;
			if(kb <1024)
			{
				var deger = kb;
				return deger.toString().split(".")[0] +" kb";
			}
			else
			{
				var deger = kb/1024 ;
				return deger.toString().split(".")[0] +" mb"
			}
	}

	cancel()
	{
		this.resultFiles = [];
		this.isStartUpload =false;
		this.close.emit(true);

	}
}
