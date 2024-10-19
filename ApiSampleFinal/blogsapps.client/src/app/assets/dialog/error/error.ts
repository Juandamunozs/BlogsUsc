import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "../../../components/profile/login.service";
@Component({
  selector: 'app-user-dialog',
  templateUrl: './error.html',
  styleUrls: ['./error.css']
})
export class ErrorDialogComponent implements OnInit {

 message: string = ''

  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    public dialogRef: MatDialogRef<ErrorDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    console.log('Datos del dialog:', data);

  this.message =  data.message;

  }

  ngOnInit() {
   
  }


  cerrar() {
    this.dialogRef.close(); 
  }
}
