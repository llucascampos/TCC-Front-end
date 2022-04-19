import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Util } from 'src/app/shared/service/util';
import { User } from 'src/app/user/models/user.model';
import { UserService } from 'src/app/user/service/user.service';
import { PriorityLevel } from '../models/priority.model';
import { TaskProject } from '../models/task-project.model';
import { PhaseService } from '../service/phase.service';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {


  formNewTask: any;
  title: string = 'Cadastrar novo projeto';
  textButton: string = 'Cadastrar';
  users: Array<User> = [];
  prioritys: Array<PriorityLevel> = [];
  idPhase: any;
  idProject: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public userService: UserService, 
    public projectService: ProjectService,
    public phaseService: PhaseService) { }

  ngOnInit(): void {
    this.idPhase = this.data.idPhase;
    this.idProject = this.data.idProject;
    console.log(this.idProject)
    if(this.data.task.id){
      this.createForm(this.data.project);
      this.title = "Atualizar Projeto";
      this.textButton = "Atualizar";
    } else {
      this.createForm(new TaskProject())
    }
 
    this.getpriotirys();
    this.getUsers();
  }
  
  createForm(newTask: TaskProject){

    this.formNewTask = new FormGroup({
      id: new FormControl(newTask.id), // apenas para editar
      title: new FormControl(newTask.title, [Validators.required]),
      description: new FormControl(newTask.description, [Validators.required]),
      createDate: new FormControl(newTask.createDate, [Validators.required]),
      expectedEndDate: new FormControl(newTask.expectedEndDate, [Validators.required]),
      user: new FormControl(newTask.user, [Validators.required]),
      priorityLevel: new FormControl(newTask.priorityLevel, [Validators.required]),
      idPhase: new FormControl(this.idPhase),
      status: new FormControl(newTask.status),
     })

  }


  registerNewTask(){

    this.formNewTask.value.expectedEndDate = Util.convertDateForSave(this.formNewTask.value.expectedEndDate.toString())

    console.log(this.formNewTask.value)
    if(this.formNewTask.valid){
      this.phaseService.registerNewTask(this.formNewTask.value).subscribe(res => {
        console.log(res)
      })

    }
  }

  getUsers(){
    this.userService.getUser().subscribe((res)=> {
      console.log(res)
        this.users = res.filter(u => u?.projectId == this.idProject);
    })
  }

  getpriotirys(){
    this.phaseService.getPriority().subscribe((res)=> {
        this.prioritys = res;
    })
  }

}
