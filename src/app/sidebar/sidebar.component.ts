import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ResearchService } from '../services/research.service';
import { MetaDataList } from './meta-data.model';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  show = true;
  showAdvanceFilter = false;
  researches: any[] = [];
  showPopup = false;
  createResearchName!: FormGroup
  isResultsVisible: boolean = false;
  endPointUrl: string = 'http://52.204.3.226/';
  pageNumber: number = 1;
  pageSize: number = 10;
  advanceFilterName!: string;
  sectionsMetaData: MetaDataList[] = [];
  actsMetaData: MetaDataList[] = [];
  caseNumbersMetaData: MetaDataList[] = [];
  citationsMetaData: MetaDataList[] = [];
  petitionerMetaData: MetaDataList[] = [];
  respondentMetaData: MetaDataList[] = [];
  benchMetaData: MetaDataList[] = [];
  message!: string;
  advancedFilter = false;
  loader = false;
  yearsList: any = [];
  queryForm!: FormGroup;
  courts: any = [{ name: 'Supreme Court of India' }, { name: 'High Court' }]

  constructor(private userService : UserService, private router : Router, private formBuilder : FormBuilder, private researchService : ResearchService, private _FB: FormBuilder, private http: HttpClient, private service: AppService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getData();
    this.queryForm = this._FB.group({
      queries: this._FB.array([this._FB.control('', Validators.required)]),
      advancedFilters: this._FB.group({
        section: null,
        act: null,
        citation: null,
        case_number: null,
        court: null,
        bench: null,
        judgement_year: this._FB.group({
          judgementFrom: [''],
          judgementTo: ['']
        }),
        petitioner: null,
        respondent: null,
      })
    })
    this.getDefaultMetadataList();

    //For Years select list
    var currentYear = new Date().getFullYear();
    var startYear = 1951;
    while (startYear <= currentYear) {
      this.yearsList.push(startYear++);
    }
  }



  initializeForm() {
    this.createResearchName = this.formBuilder.group({
      research: new FormControl('', [Validators.required, ]),
    })
  }

  showAFilter() {
    this.showAdvanceFilter = true;
  }

  getControl(name: any): AbstractControl | null {
    return this.createResearchName.get(name);
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toDateString();
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  research(data: any) {
    let token = localStorage.getItem("token")
    this.userService.getDetailsByToken(token).subscribe((res) => {

      const body = {
        name : data. research,
        dateCreated : new Date(),
        lastModified : new Date(),
        userId : res.id
      }
      this.researchService.createResearch(body).subscribe();
      this.showPopup = false;
      this.router.navigateByUrl("/home");
    })
  }

  getData() {
    this.researchService.getResearchDetails().subscribe((res) => {
      this.researches = res;
    });
  }

  get queries() {
    return this.queryForm.get('queries') as FormArray;
  }

  addQueries() {
    this.queries.push(this._FB.control(''));
  }

  removeQueries(index: number) {
    (this.queryForm.get('queries') as FormArray).removeAt(index);
  }

  /**
   * Get search results based on search query
   */
  getResultsBasedOnSearch(): void {
    this.show = false;
    this.showAdvanceFilter = false
    this.loader = true; //Enables loader on form submit
    const formData = this.queryForm.value;
    this.http.post(`${this.endPointUrl}api/` + `?page=${this.pageNumber}` + `&page_size=${this.pageSize}`, formData).subscribe(
      (response:any) => {
        console.log(response);

        //If got response
        this.service.sendResponse(response); //send response to results component
        this.loader = false; // disables the loader
        this.isResultsVisible = true;
      },
      (error:any) => {
        console.log(error); // temporary log error
        this.loader = false;
      }
    )
  }

  resetForm() {
    window.location.reload();
  }

  closeAdvancefilter() {
    this.showAdvanceFilter = false;
  }

  enableFilter() {
    this.advancedFilter = !this.advancedFilter;
  }

  /**
   * On page change, load new data for specific page
   * @param page
   */
  onPageChange(page: number): void {
    this.loader = true;
    // this.showAdvanceFilter = false
    this.pageNumber = page;
    this.getResultsBasedOnSearch();
    window.scroll({
      top: 100,
      left: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Get default metadata for all fields
   */
  getDefaultMetadataList(): void {

    // reset all advancedFilters fields while changing the query
    this.queryForm.get('advancedFilters')?.reset();
    let queries: any;
    queries = this.queryForm.get('queries')?.value;
    this.loader = true;

    this.service.getDefaultMetaData(queries).subscribe((response: any) => {
      this.resetAllMetadataList();
      let tempActsMetaData: any = [];
      let tempSectionsMetaData: any = [];
      let tempBenchMetaData: any = [];
      let tempCaseNumbersMetaData: any = [];
      let tempCitationsMetaData: any = [];
      let tempRespondentMetaData: any = [];
      let tempPetitionerMetaData: any = [];
      // name = acts, bench, case_numbers, citations, court, petitioner, respondent, sections

      // acts meta-data
      response['acts'].forEach((individualMetaData: any) => {
        tempActsMetaData.push({
          id: individualMetaData.doc_count,
          name: individualMetaData.key
        });
      });
      this.actsMetaData = tempActsMetaData;

      // bench meta-data
      response['bench'].forEach((individualMetaData: any) => {
        tempBenchMetaData.push({
          id: individualMetaData.doc_count,
          name: individualMetaData.key
        });
      });
      this.benchMetaData = tempBenchMetaData;

      // case_numbers meta-data
      response['case_numbers'].forEach((individualMetaData: any) => {
        tempCaseNumbersMetaData.push({
          id: individualMetaData.doc_count,
          name: individualMetaData.key
        });
      });
      this.caseNumbersMetaData = tempCaseNumbersMetaData;

      // citations meta-data
      response['citations'].forEach((individualMetaData: any) => {
        tempCitationsMetaData.push({
          id: individualMetaData.doc_count,
          name: individualMetaData.key
        });
      });
      this.citationsMetaData = tempCitationsMetaData;

      // petitioner meta-data
      response['petitioner'].forEach((individualMetaData: any) => {
        tempPetitionerMetaData.push({
          id: individualMetaData.doc_count,
          name: individualMetaData.key
        });
      });
      this.petitionerMetaData = tempPetitionerMetaData;

      // respondent meta-data
      response['respondent'].forEach((individualMetaData: any) => {
        tempRespondentMetaData.push({
          id: individualMetaData.doc_count,
          name: individualMetaData.key
        });
      });
      this.respondentMetaData = tempRespondentMetaData;

      // sections meta-data
      response['sections'].forEach((individualMetaData: any) => {
        tempSectionsMetaData.push({
          id: individualMetaData.doc_count,
          name: individualMetaData.key
        });
      });
      this.sectionsMetaData = tempSectionsMetaData;
      this.loader = false;
    },
      (error: any) => {
        console.log(error); // temporary log errors
        this.loader = false;
      }
    )
  }

  /**
   * Get updated metadata list based on user input
   * @param searchedTerm searched term
   * @param fieldName field name of the searched term (sections, acts, case_numbers etc.)
   */
  getMetaDataListBaseOnInput(searchedTerm: string, fieldName: string): void {
    this.loader = true;
    let curretQueries: any;
    curretQueries = this.queryForm.get('queries')?.value;
    let updatedQueries = curretQueries.filter((empty: any) => empty); // remove empty entries
    let queryFiledValues: any = this.queryForm.value['advancedFilters']; // store advance filters values
    let judgementYears: any = this.queryForm.get('advancedFilters')?.get('judgement_year'); // store judgement years values
    // metadata body
    let searchMetadataBody = {
      "name": fieldName,
      "filter_search_query": searchedTerm,
      "queries": updatedQueries,
      "advancedFilters": {
        "section": queryFiledValues.section !== null ? queryFiledValues.section : '',
        "act": queryFiledValues.act !== null ? queryFiledValues.act : '',
        "citation": queryFiledValues.citation !== null ? queryFiledValues.citation : '',
        "case_number": queryFiledValues.case_number !== null ? queryFiledValues.case_number : '',
        "court": queryFiledValues.court,
        "bench": queryFiledValues.bench !== null ? queryFiledValues.bench : '',
        "judgement_year": {
          "judgementFrom": judgementYears.get('judgementFrom')?.value,
          "judgementTo": judgementYears.get('judgementTo')?.value
        },
        "petitioner": queryFiledValues.petitioner !== null ? queryFiledValues.petitioner : '',
        "respondent": queryFiledValues.respondent !== null ? queryFiledValues.respondent : ''
      }
    }

    this.service.getMetadataForFields(searchMetadataBody).subscribe((response: any) => {
      let tempActsMetaData: any = [];
      let tempSectionsMetaData: any = [];
      let tempBenchMetaData: any = [];
      let tempCaseNumbersMetaData: any = [];
      let tempCitationsMetaData: any = [];
      let tempRespondentMetaData: any = [];
      let tempPetitionerMetaData: any = [];

      // update sections deopdown
      if (fieldName === 'sections') {
        this.sectionsMetaData = [];
        response['sections'].forEach((individualMetaData: any) => {
          tempSectionsMetaData.push({
            id: individualMetaData.doc_count,
            name: individualMetaData.key
          });
        });

        this.sectionsMetaData = tempSectionsMetaData;
      }

      // update acts deopdown
      else if (fieldName === 'acts') {
        this.actsMetaData = [];
        response['acts'].forEach((individualMetaData: any) => {
          tempActsMetaData.push({
            id: individualMetaData.doc_count,
            name: individualMetaData.key
          });
        });

        this.actsMetaData = tempActsMetaData;
      }

      // update bench deopdown
      else if (fieldName === 'bench') {
        this.benchMetaData = [];
        response['bench'].forEach((individualMetaData: any) => {
          tempBenchMetaData.push({
            id: individualMetaData.doc_count,
            name: individualMetaData.key
          });
        });

        this.benchMetaData = tempBenchMetaData;
      }

      // update case_numbers deopdown
      else if (fieldName === 'case_numbers') {
        this.caseNumbersMetaData = [];
        response['case_numbers'].forEach((individualMetaData: any) => {
          tempCaseNumbersMetaData.push({
            id: individualMetaData.doc_count,
            name: individualMetaData.key
          });
        });

        this.caseNumbersMetaData = tempCaseNumbersMetaData;
      }

      // update citations deopdown
      else if (fieldName === 'citations') {
        this.citationsMetaData = [];
        response['citations'].forEach((individualMetaData: any) => {
          tempCitationsMetaData.push({
            id: individualMetaData.doc_count,
            name: individualMetaData.key
          });
        });

        this.citationsMetaData = tempCitationsMetaData;
      }

      // update petitioner deopdown
      else if (fieldName === 'petitioner') {
        this.petitionerMetaData = [];
        response['petitioner'].forEach((individualMetaData: any) => {
          tempPetitionerMetaData.push({
            id: individualMetaData.doc_count,
            name: individualMetaData.key
          });
        });
        this.petitionerMetaData = tempPetitionerMetaData;
      }

      // update respondent deopdown
      else {
        this.respondentMetaData = [];
        response['respondent'].forEach((individualMetaData: any) => {
          tempRespondentMetaData.push({
            id: individualMetaData.doc_count,
            name: individualMetaData.key
          });
        });
        this.respondentMetaData = tempRespondentMetaData;
      }

      this.loader = false;
    },
      (error:any) => {
        console.log(error); // temporary log errors
        this.loader = false;
      });
  }

  /**
   * Reset all metadata dropdown list
   */
  resetAllMetadataList(): void {
    this.sectionsMetaData = [];
    this.actsMetaData = [];
    this.benchMetaData = [];
    this.caseNumbersMetaData = [];
    this.citationsMetaData = [];
    this.respondentMetaData = [];
    this.petitionerMetaData = [];
  }

}

