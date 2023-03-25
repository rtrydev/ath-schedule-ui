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
  branchData: any[] = [];
  selectedSchedule?: ScheduleItem;

  constructor(private formBuilder: FormBuilder, private scheduleExploreService: ScheduleExploreService) {}

  ngOnInit() {
    this.scheduleExploreService.getBaseBranch()
      .subscribe(branch => {
        this.branchData.push((branch as any).branchData);
      });
  }

  optionSelected(type: string, event?: any) {
    const explorationBranchIndex = parseInt(type);
    const selectedOptionIndex = event.target.selectedIndex - 1;

    const selectedItem = this.branchData[explorationBranchIndex][selectedOptionIndex];

    if (explorationBranchIndex + 1 !== this.branchData.length) {
      this.selectedSchedule = undefined;
      const initialLength = this.branchData.length;

      for (let i = explorationBranchIndex + 1; i < initialLength; i++) {
        this.branchData.pop();
      }
    }

    if (!!selectedItem.id) {
      this.selectedSchedule = selectedItem;
      return;
    }

    this.scheduleExploreService.exploreBranch(selectedItem)
      .subscribe(branch => {
        this.branchData.push((branch as any).branchData);
      });
  }

  canSubmit() {
    return !!this.selectedSchedule;
  }

  submit() {
    if (!this.selectedSchedule) {
      return;
    }

    this.formSubmitEvent.emit(this.selectedSchedule);

    localStorage.setItem('lastFetchedSchedule', JSON.stringify(this.selectedSchedule));
  }
}
