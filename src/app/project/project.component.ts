import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/service/user.service';
import { Phase } from './models/phase.model';
import { Project } from './models/Project';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectService } from './service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Observable<Array<Project>>;
  projectSearch: string;

  constructor(
    public dialog: MatDialog, 
    public userService: UserService, 
    public projectService: ProjectService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProjects();
  }


  openDialogNewProject(project: Project = new Project()){
    const dialogRef = this.dialog.open(NewProjectComponent, {
      height: '300px',
      width: '50%',
      data: {project}
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() =>{
        this.getProjects();
      },500)
     
    });

  }

  getProjects(){
    this.projects = this.projectService.getProject();
  }

  getProjectByName(){
    this.projects = this.projectService.getprojectByName(this.projectSearch);
  }

  projectDetail(idProject: number){
    this.router.navigate([`/project/${idProject}`]);
  }

  totalLateTask(phases: Array<Phase>){
    if(phases){
      let phaseActive = phases.find(p => p.status.id == 5)
      return phaseActive?.tasks.map(t => t.status.id == 7).length;
    }
    return 0;  
  }

}
