import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css'],
})
export class AllEmployeesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'salary', 'department'];
  dataSource: MatTableDataSource<UserData>;
  searchTextControl = new FormControl<string | null>(null);
  users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  private _dataSourceChecker$: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      //this.firstname = params["firstname"];
      //this.lastname = params["lastname"];
      //this.setFruits(params)
      console.log(params);
      this.dataSource = new MatTableDataSource<UserData>(this.users);
      this.mapTableData(this.users);
    });
    //this.dataSource = new MatTableDataSource<UserData>(this.users);
    //this.mapTableData(this.users);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async ngOnInit(): Promise<void> {
    // Assign the data to the data source for the table to render
    //await this.waitForDatasourceToLoad()
    //this.mapTableData(this.users);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Update parameters after user enters search text or changes page selection
   *
   * @author Pavan Kumar Jadda
   * @since 2.0.0
   */
  updateRouteParameters($event: PageEvent | null) {
    //console.log(this.router.url);
    //console.log(this.activatedRoute.snapshot.queryParams);

    const params = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      searchText: this.searchTextControl?.value?.trim() ?? '',
      sortBy: this.sort.active,
      sortDirection: this.sort.direction,
    };
    const urlTree = this.router.createUrlTree(['/employee/all'], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });

    //Update route with Query Params
    this.location.go(urlTree.toString());
    console.log(this.location.path());
  }
  /**
   * Map ProtocolEnrollments to mat-table data format
   *
   * @author Pavan Kumar Jadda
   * @since 2.0.0
   */
  private mapTableData(data: UserData[]) {
    //this.dataSource = new MatTableDataSource<UserData>(data);
    console.log(
      'this.route.snapshot.queryParamMap.get("pageSize")',
      this.route.snapshot.queryParamMap.get('pageSize')
    );
    if (this.optionalParamsPresent()) {
      this.sort.active =
        this.route.snapshot.queryParamMap.get('sortBy') ?? 'id';
      //@ts-ignore
      this.sort.direction =
        this.route.snapshot.queryParamMap.get('sortDirection') ?? 'desc';
      this.paginator.pageIndex =
        Number.parseInt(
          this.route.snapshot.queryParamMap.get('pageIndex') as string,
          10
        ) ?? 0;
      this.paginator.pageSize =
        Number.parseInt(
          this.route.snapshot.queryParamMap.get('pageSize') as string,
          10
        ) ?? 10;
      this.searchTextControl.patchValue(
        this.route.snapshot.queryParamMap.get('searchText') ?? ''
      );
      this.dataSource.filter =
        this.route.snapshot.queryParamMap.get('searchText') ?? '';
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
    } else {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  /**
   * Return `true` if any of the optional params present, Otherwise returns false
   *
   * @author Pavan Kumar Jadda
   * @since 2.0.0
   */
  private optionalParamsPresent(): boolean {
    return (
      !isUndefinedOrNullOrEmptyValue(
        this.route.snapshot.queryParamMap.get('pageIndex')
      ) ||
      !isUndefinedOrNullOrEmptyValue(
        this.route.snapshot.queryParamMap.get('pageSize')
      ) ||
      !isUndefinedOrNullOrEmptyValue(
        this.route.snapshot.queryParamMap.get('searchText')
      ) ||
      !isUndefinedOrNullOrEmptyValue(
        this.route.snapshot.queryParamMap.get('sortBy')
      ) ||
      !isUndefinedOrNullOrEmptyValue(
        this.route.snapshot.queryParamMap.get('sortDirection')
      )
    );
  }
}

function isUndefinedOrNullOrEmptyValue(value: any): boolean {
  return value === undefined || value === null || value === '';
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';
  return {
    id: id.toString(),
    name: name,
    salary: Math.round(Math.random() * 100000).toString(),
    department:
      DEPARTMENTS[Math.round(Math.random() * (DEPARTMENTS.length - 1))],
  };
}

export interface UserData {
  id: string;
  name: string;
  salary: string;
  department: string;
}

/** Constants used to fill up our data base. */
export const DEPARTMENTS: string[] = [
  'Accounting',
  'Human Resources',
  'Information Technology',
  'Manufactering',
  'Sales',
  'Cleaning Services',
  'Transportation',
];

export const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
