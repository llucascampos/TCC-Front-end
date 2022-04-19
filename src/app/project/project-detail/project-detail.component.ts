import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { MembersComponent } from '../members/members.component';
import { Phase } from '../models/phase.model';
import { Project } from '../models/Project';
import { TaskProject } from '../models/task-project.model';
import { NewPhaseComponent } from '../new-phase/new-phase.component';
import { NewTaskComponent } from '../new-task/new-task.component';
import { PhaseService } from '../service/phase.service';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  panelOpenState = false;
  idProject: any;
  phases: Array<Phase> = [];
  phaseActive: any;
  selectedPhase: string = '';
  project: Project;


  constructor(
    public dialog: MatDialog, 
    private activatedRoute: ActivatedRoute,
    public projectService: ProjectService,
    public phaseService: PhaseService) {
      this.idProject = this.activatedRoute.snapshot.paramMap.get('idProject');
     }

  ngOnInit(): void {
    this.getProjectById();    
  }

  getProjectById(){
    this.projectService.getprojectById(this.idProject).subscribe(res => {
      console.log(res)
      this.project = res;
      this.phaseActive = res.phases.find(p => p.status.id == 5);
      console.log(res)
    })
  }
  

  openDialogNewTask(task: TaskProject = new TaskProject()){
    if(this.phaseActive.status.id == 4) {
      this.openDialogAlert("Não é possivel incluir novas tarefas em fase ja está finalizada")
    
    } else{
    const dialogRef = this.dialog.open(NewTaskComponent, {
      height: '500px',
      width: '50%',
      data: {task, idProject: this.idProject, idPhase: this.phaseActive?.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() =>{
        this.getProjectById();
      },500)
    });
    }

  }

  openDialogNewPhase(phase: Phase = new Phase()){
    let phasective = this.project.phases.find(p => p.status.id == 5);
    console.log(phasective)
    if(phasective) {
      this.openDialogAlert("Ainda existe uma fase ativa, finalize-a para poder iniciar uma nova")
    } else{
      const dialogRef = this.dialog.open(NewPhaseComponent, {
        width: '50%',
        data: {phase, idProject: this.idProject}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        setTimeout(() =>{
          this.getProjectById()
        },500)
       
      });
    }
  }

  openDialogMembers(){
      const dialogRef = this.dialog.open(MembersComponent, {
        width: '50%',
        data: {idProject: this.idProject}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        setTimeout(() =>{

        },500)
       
      });
    
  }


  openDialogAlert(message: string = ''){
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '50%',
      data: {message: message}
    });
  }



  updateProject(status: number, id: number, step: string){
    var url = ''
    switch(step) {
      case 'project': 
      if(this.phaseActive){
        this.openDialogAlert("Existe fase ativa ainda nesse projeto, finaliza-a primeiro")
        break
      }
      
        url = '/project'
      break;
      case 'phase': 
      if(this.phaseActive.tasks.find((t: TaskProject) => t.status.id != 4)){
        this.openDialogAlert("Existe tarefas não concluidas nessa fase, finaliza-as para poder finalizar a fase atual")
        break;
      }
 
        url = '/phase'
      break;
      case 'task': 
        url = '/phase/task'
      break;
    }

    this.projectService.update(url, status, id).subscribe(res => {
      this.getProjectById()
    })

  }


  selectOtherPhase(id: number){
    this.phaseService.getPhasesById(id).subscribe( res => {
      this.phaseActive = res
    })
  }

}

