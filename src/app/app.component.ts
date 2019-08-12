import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenNames = ['Test1', 'test1'];
  alternateForbiddenNames = ['Test2', 'test2'];
  projectStatuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required, this.forbiddenProjectNames.bind(this)],
        this.alternateForbiddenProjectNames.bind(this)
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl('Critical')
    });
  }

  onSubmitProject() {
    console.log(this.projectForm.value);
  }

  forbiddenProjectNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
  alternateForbiddenProjectNames(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.alternateForbiddenNames.indexOf(control.value) !== -1) {
          resolve({ alternateIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 2500);
    });
    return promise;
  }
}
