import { Component, OnInit } from '@angular/core';
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
export class ProjectListComponent implements OnInit {

  projects: Observable<Project[]>;
  selectedProject: Project;
  constructor(private projectService: ProjectService, private router: Router) {
    this.refresh();
   }

   ngOnInit(){
     this.refresh();
   }

   onSelect(project: Project): void{
     this.selectedProject = project;
   }

   refresh(){
    this.projects = this.projectService.getProjects();
   }

   addNewProject(){
     let newT = new Project;
     let newTId : String;
     console.log("New Project:" + JSON.stringify(newT));
     newTId = this.projectService.addProject(newT);
     console.log("new ProjectID:" + newTId);
     //if (newTId!=null)
      this.router.navigate(['/projects/' + newTId]);
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
