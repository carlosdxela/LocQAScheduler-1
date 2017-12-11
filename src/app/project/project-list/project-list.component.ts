import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Project } from '../project';
import { ProjectService } from '../project.service';

//import { AccordionModule } from 'ngx-bootstrap';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {

  projects: Observable<Project[]>;
  selectedProject: Project;
  constructor(private projectService: ProjectService, private router: Router) {
    this.projects = this.projectService.getProjects();
   }

   onSelect(project: Project): void{
     this.selectedProject = project;
   }

   addNewProject(){
     let newT = new Project;

     console.log("New Project:" + newT);
     this.projectService.addProject(newT);
     //this.router.navigate(['/testers/' + newT.id]);
   }

   deleteProject(projectId){
     if (confirm("Are you sure you want to delete this item?"))
     {
     console.log("Attempt to delete Tester with ID:" + projectId);
     this.projectService.deleteProject(projectId);
     this.projects = this.projectService.getProjects();
    }
    else {
      console.log("Item not deleted");
    }
   }

}
