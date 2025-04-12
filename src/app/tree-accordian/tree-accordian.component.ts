
import { NestedTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, signal} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface TreeNode {
  name: string;
  children?: TreeNode[];
  data?: any;
  expanded?: boolean; 
}

interface TreeNode1 {
  name: string;
  children?: TreeNode[];
  data?: any;
}
@Component({
  selector: 'app-tree-accordian',
  imports: [MatExpansionModule,MatTreeModule, MatButtonModule, MatIconModule,CommonModule,MatProgressSpinnerModule],

  templateUrl: './tree-accordian.component.html',
  styleUrl: './tree-accordian.component.css'
})

export class TreeAccordianComponent {
  readonly panelOpenState = signal(false);
 
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  apiResponse:any={}
  treeData: TreeNode[] = [];
  dataLoaded = false;

  constructor(private http: HttpClient,private cdRef: ChangeDetectorRef) {}
  ngOnInit() {
    this.http.get<any>('data.json').subscribe({
      next: (res) => {
        const tableData = res?.Data?.Table;
        if (tableData) {
          this.treeData = this.transformToDynamicTree(tableData);
          console.log(this.treeData)
          this.dataSource.data = this.treeData;
          this.dataLoaded = true; 
        }
      },
      error: (err) => {
        console.error("Error loading tree data:", err);
        this.dataLoaded = true; // Still show something to user
      }
    });
  }
  
  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
  

   transformToDynamicTree(data: any[]): TreeNode[] {
    const tree: TreeNode[] = [];
  
    data.forEach(item => {
      let currentLevel = tree;
      let parent: TreeNode | null = null;
  
      for (let i = 1; i <= 10; i++) {
        const levelKey = `TreeRuleDisplayName${i}`;
        const levelName = item[levelKey];
  
        if (!levelName) break; // Stop if the level doesn't exist
  
        let existingNode = currentLevel.find(n => n.name === levelName);
        if (!existingNode) {
          existingNode = { name: levelName, children: [], expanded: false };
          currentLevel.push(existingNode);
        }
  
        parent = existingNode;
        if (!existingNode.children) existingNode.children = [];
        currentLevel = existingNode.children;
      }
  
      // Add the leaf node at the final level
      if (parent) {
        parent.children!.push({
          name: item.Row1Col3 || 'Entry',
          data: item
        });
      }
    });
  
    return tree;
  }
  

  
  
}
 