import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { User } from 'src/app/user/models/user.model';
import { UserService } from 'src/app/user/service/user.service';
import { Project } from '../models/Project';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  formNewProject: any;
  title: string = 'Cadastrar novo projeto';
  textButton: string = 'Cadastrar';
  members: Array<User> = [];
  projects: Array<Project>;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService, public projectService: ProjectService) { }

  ngOnInit(): void {

    this.getProjects()
    
    if(this.data.project.id){
      this.createForm(this.data.project);
      this.title = "Atualizar Projeto";
      this.textButton = "Atualizar";
    } else {
      this.createForm(new Project())
    }
 
  
  }


  createForm(newProject: Project){
    console.log(newProject)
    this.formNewProject = new FormGroup({
      id: new FormControl(newProject.id), // apenas para editar
      name: new FormControl(newProject.name, [Validators.required]),
      description: new FormControl(newProject.description),
      startDate: new FormControl(newProject.startDate),
      manager: new FormControl(JSON.parse(sessionStorage.getItem('user') || '')),
      members: new FormControl(newProject.members),
      status: new FormControl(newProject.status),
     })

  }

  registerNewProject(){

    if(this.formNewProject.valid){      
      let project = this.projects.find(p=> p.name == this.formNewProject.value.name)
 
      if(project){
       this.dialog.open(AlertComponent, {
         data: {
           message: 'Já existe um projeto com esse nome cadastrado.',
         },
       })
      } else {
      this.projectService.registerNewProject(this.formNewProject.value).subscribe(res => {
        console.log(JSON.stringify(res))
      })
    }
    }
  }


  getProjects(){
    this.projectService.getProject().subscribe(res => {
      this.projects = res;
    })
  }


}
