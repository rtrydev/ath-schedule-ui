import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {FeedItem} from "../../../models/feed-item.model";
import {ScheduleItem} from "../../../models/schedule-item.model";
import {ScheduleExploreService} from "../../../services/schedule-explore.service";

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {
  @Output() formSubmitEvent = new EventEmitter<ScheduleItem>();
  faculties: FeedItem[] = [];
  types: FeedItem[] = [];
  fields: FeedItem[] = [];
  degrees: FeedItem[] = [];
  terms: FeedItem[] = [];
  groups: FeedItem[] = [];
  subgroups: ScheduleItem[] = [];

  scheduleForm = this.formBuilder.group({
    faculty: '',
    type: '',
    field: '',
    degree: '',
    term: '',
    group: '',
    subgroup: ''
  });

  constructor(private formBuilder: FormBuilder, private scheduleExploreService: ScheduleExploreService) {}

  ngOnInit() {
    this.scheduleExploreService.getBaseBranch()
      .subscribe(branch => {
        this.faculties = (branch as any).branchData as FeedItem[];
      });
  }

  optionSelected(type: string) {
    const nextBranchMap = {
      faculty: 'types',
      type: 'fields',
      field: 'degrees',
      degree: 'terms',
      term: 'groups',
      group: 'subgroups'
    }

    const nextTypeMap = {
      faculty: 'type',
      type: 'field',
      field: 'degree',
      degree: 'term',
      term: 'group',
      group: 'subgroup'
    }

    if (!(type in nextBranchMap)) {
      return;
    }

    const selectedBranch = this.scheduleForm.get(type)?.value;

    if (!selectedBranch) {
      return;
    }

    const typeData = this.getDataForType(type) as FeedItem[];
    const selectedItem = typeData.find(type => type.branch === selectedBranch);

    if (!selectedItem) {
      return;
    }

    let clearPastItem = type;
    // @ts-ignore
    while (nextTypeMap[clearPastItem]) {
      // @ts-ignore
      this[nextBranchMap[nextTypeMap[clearPastItem]]] = [];
      // @ts-ignore
      this.scheduleForm.get(nextTypeMap[clearPastItem])?.reset('');

      // @ts-ignore
      clearPastItem = nextTypeMap[clearPastItem];
    }

    // @ts-ignore
    const nextBranch = nextBranchMap[type] as string;

    this.scheduleExploreService.exploreBranch(selectedItem)
      .subscribe(branch => {
        // @ts-ignore
        this[nextBranch] = (branch as any).branchData as FeedItem[];
      });
  }

  canSubmit() {
    return !!this.scheduleForm.get('subgroup')?.value;
  }

  submit() {
    const scheduleId = this.scheduleForm.get('subgroup')?.value;
    const scheduleType = this.subgroups.find(subgroup => subgroup.id === scheduleId)?.type;
    const scheduleTitle = this.subgroups.find(subgroup => subgroup.id === scheduleId)?.title;

    const scheduleItem = {
      id: scheduleId || '',
      type: scheduleType || '',
      title: scheduleTitle || ''
    };

    this.formSubmitEvent.emit(scheduleItem);

    localStorage.setItem('lastFetchedSchedule', JSON.stringify({
      id: scheduleId,
      type: scheduleType,
      title: scheduleTitle
    }));
  }

  private getDataForType(dataType: string) {
    const typeMap = {
      faculty: this.faculties,
      type: this.types,
      field: this.fields,
      degree: this.degrees,
      term: this.terms,
      group: this.groups
    }

    if (dataType in typeMap) {
      // @ts-ignore
      return typeMap[dataType];
    }

    return [];
  }
}
