import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Phase } from '../models/phase.model';
import { PhaseService } from '../service/phase.service';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-new-phase',
  templateUrl: './new-phase.component.html',
  styleUrls: ['./new-phase.component.css']
})
export class NewPhaseComponent implements OnInit {

  formNewPhase: any;
  title: string = 'Criar nova fase do projeto';
  textButton: string = 'Cadastrar';
  idProject!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: any, 
    public projectService: ProjectService,
    public phaseService: PhaseService
    ) { }

  ngOnInit(): void {

    this.idProject = this.data.idProject;
    console.log(this.data)

    if(this.data.phase.id){
      this.createForm(this.data.phase);
      this.title = "Atualizar fase";
      this.textButton = "Atualizar";
    } else {
      this.createForm(new Phase())
    }

  }
  
  createForm(newPhase: Phase){
    console.log(newPhase)
    this.formNewPhase = new FormGroup({
      id: new FormControl(newPhase.id), // apenas para editar
      name: new FormControl(newPhase.name, [Validators.required]),
      startDate: new FormControl(newPhase.startDate, [Validators.required]),
      status: new FormControl(newPhase.status, [Validators.required]),
      description: new FormControl(newPhase.description, [Validators.required]),
      idProject: new FormControl(this.idProject),
     })

  }

  registerNewPhase(){
    console.log(this.formNewPhase.value)
    if(this.formNewPhase.valid){
      this.phaseService.registerNewPhase(this.formNewPhase.value).subscribe(res => {
        console.log(res)
      })

    }
  }


}
