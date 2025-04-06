import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlatTreeControl } from '@angular/cdk/tree';




/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  role: string; 
}

interface BusinessNode {
  name: string;
  role: string;
  children?: BusinessNode[];
}

const BUSINESS_TREE_DATA: BusinessNode[] = [
  {
    name: "John Doe",
    role: "Company Owner",
    children: [
      {
        name: "Sarah Smith",
        role: "CEO",
        children: [
          {
            name: "David Johnson",
            role: "Director",
            children: [
              { name: "Emma Wilson", role: "VP" },
              { name: "James Brown", role: "VP" }
            ]
          },
          {
            name: "Michael Clark",
            role: "Director",
            children: [
              { name: "Sophia Lewis", role: "VP" }
            ]
          }
        ]
      }
    ]
  }
];


@Component({
  selector: 'app-tree-view',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.css'
})
export class TreeViewComponent {
  private _transformer = (node: BusinessNode, level: number): ExampleFlatNode & { role: string } => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      role: node.role // 👈 include role
    };
  };
  

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
    
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = BUSINESS_TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  getIcon(role: string): string {
    switch (role) {
      case "Company Owner":
        return "business";
      case "CEO":
        return "star"; 
      case "Director":
        return "supervisor_account"; 
      case "VP":
        return "person";
      default:
        return "account_circle";
    }
  }
  
}


