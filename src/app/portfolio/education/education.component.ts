import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  o = {
    title: 'Education',
    list: [
      {
        date: '2008',
        dipolma: 'Baccalauréat Science Physique',
        universite: `Lycée Moulay Ali Charif TEMARA`,
      },
      {
        date: `2010`,
        dipolma: `DUT Lieutenant de Maritime`,
        universite: `ISPM AGADIR`,
      },
      {
        date: `2015`,
        dipolma: `Licence professionnel en Pêche`,
        universite: `ISPM AGADIR`,
      },
      {
        date: `2017`,
        dipolma: `Certification Microsoft (en ASP.NET MVC 5, SQL SERVER 2014, C#, « HTML – CSS – JAVASCRIPT », WINDOWS 7)`,
        universite: `ISTA TEMARA`,
      },
      {
        date: `2018`,
        dipolma: `DTS Développement Informatique`,
        universite: `ISTA TEMARA`,
      },
      {
        date: `2020`,
        dipolma: `LP Conduite de projets parcours Tech Dev Web`,
        universite: `FST LIMOGES FRANCE`,
      },
    ]
  };
  constructor() { }

  ngOnInit(): void {
  }

}
