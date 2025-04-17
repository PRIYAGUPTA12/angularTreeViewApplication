import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tree-view',
  imports: [OrganizationChartModule,ButtonModule],
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.css'
})
export class TreeViewComponent {
  data1: any = null;
  selectedNodes!: TreeNode[];


  data: TreeNode[] = [
      {
          expanded: true,
          type: 'person',
          data: {
              image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
              name: 'Amy Elsner',
              title: 'CEO'
          },
          children: [
              {
                  expanded: true,
                  type: 'person',
                  data: {
                      image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                      name: 'Anna Fali',
                      title: 'CMO'
                  },
                  children: [
                    {
                        expanded: true,
                        type: 'person',
                        data: {
                            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                            name: 'RMO Singh',
                            title: 'Director'
                        },
                        children: [
                            {
                                label: 'Research'
                            },
                            {
                                label: 'Marketing'
                            }
                        ]
                    },
                      {
                          label: 'Marketing'
                      }
                  ]
              },
              {
                  expanded: true,
                  type: 'person',
                  data: {
                      image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                      name: 'Stephen Shaw',
                      title: 'CTO'
                  },
                  children: [
                      {
                          label: 'Development'
                      },
                      {
                          label: 'UI/UX Design'
                      }
                  ]
              },

              {
                expanded: true,
                type: 'person',
                data: {
                    image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                    name: 'Stencil Shaw',
                    title: 'CTO',

                }
            }
          ]
      }
  ];

  
}



