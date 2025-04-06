
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
  expanded?: boolean; // ✅ Add this line
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
    debugger
    this.http.get<any>('data.json').subscribe({
      next: (res) => {
        const tableData = res?.Data?.Table;
        if (tableData) {
          this.treeData = this.transformToTree(tableData);
          console.log(this.treeData)
          this.dataSource.data = this.treeData;
          this.dataLoaded = true; // 🔥 Set flag to true when ready
        }
      },
      error: (err) => {
        console.error("Error loading tree data:", err);
        this.dataLoaded = true; // Still show something to user
      }
    });
  }
  
  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
  
  transformToTree1(data: any[]): TreeNode[] {
    const tree: TreeNode[] = [];
  
    data.forEach(item => {
      const lvl1 = item.TreeRuleDisplayName1;
      const lvl2 = item.TreeRuleDisplayName2;
  
      let lvl1Node = tree.find(t => t.name === lvl1);
      if (!lvl1Node) {
        lvl1Node = { name: lvl1, children: [] };
        tree.push(lvl1Node);
      }
  
      let lvl2Node = lvl1Node.children!.find(c => c.name === lvl2);
      if (!lvl2Node) {
        lvl2Node = { name: lvl2, children: [] };
        lvl1Node.children!.push(lvl2Node);
      }
  
      lvl2Node.children!.push({ name: item.Row1Col3 || 'Entry', data: item });
    });
  
    return tree;
  }
  transformToTree(data: any[]): TreeNode[] {
    const tree: TreeNode[] = [];
  
    data.forEach(item => {
      const lvl1 = item.TreeRuleDisplayName1 ?? 'Uncategorized';
      const lvl2 = item.TreeRuleDisplayName2 ?? 'Sub-category';
  
      let lvl1Node = tree.find(t => t.name === lvl1);
      if (!lvl1Node) {
        lvl1Node = { name: lvl1, children: [], expanded: false };
        tree.push(lvl1Node);
      }
  
      // Ensure lvl1Node has children initialized
      if (!lvl1Node.children) lvl1Node.children = [];
  
      let lvl2Node = lvl1Node.children.find(c => c.name === lvl2);
      if (!lvl2Node) {
        lvl2Node = { name: lvl2, children: [], expanded: false };
        lvl1Node.children.push(lvl2Node);
      }
  
      // Ensure lvl2Node has children initialized
      if (!lvl2Node.children) lvl2Node.children = [];
  
      lvl2Node.children.push({ name: item.Row1Col3 || 'Entry', data: item });
    });
  
    return tree;
  }
  
  
}
 