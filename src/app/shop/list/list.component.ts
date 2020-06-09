import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { groupBy } from 'lodash-es';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isLoading = false;
  categories: any = [
    {
      name: "Miscellaneous",
      isFiltered: false
    },
    {
      name: "Wall-mounted",
      isFiltered: false
    },
    {
      name: "Wallpaper",
      isFiltered: false
    },
    {
      name: "Floors",
      isFiltered: false
    },
    {
      name: "Rugs",
      isFiltered: false
    },
    {
      name: "Photos",
      isFiltered: false
    },
    {
      name: "Posters",
      isFiltered: false
    },
    {
      name: "Tools",
      isFiltered: false
    },
    {
      name: "Fencing",
      isFiltered: false
    },
    {
      name: "Tops",
      isFiltered: false
    },
    {
      name: "Bottoms",
      isFiltered: false
    },
    {
      name: "Dress-Up",
      isFiltered: false
    },
    {
      name: "Headwear",
      isFiltered: false
    },
    {
      name: "Accessories",
      isFiltered: false
    },
    {
      name: "Socks",
      isFiltered: false
    },
    {
      name: "Shoes",
      isFiltered: false
    },
    {
      name: "Bags",
      isFiltered: false
    },
    {
      name: "Umbrellas",
      isFiltered: false
    },
    {
      name: "Recipes",
      isFiltered: false
    },
    {
      name: "Fossils",
      isFiltered: false
    },
    {
      name: "Art",
      isFiltered: false
    },
    {
      name: "Other",
      isFiltered: false
    }
  ];
  totalRecords: any;
  allData: any;
  currentPageIndex: any;
  currentData: any = [];
  recordPerPage: any;
  products: any = [];
  isNextAvailable = true;
  pageNumArr = [];
  sortKey: any = '';
  originalData: any = [];
  searchWord: any = '';
  paymentData: any;
  constructor(
    private ms: MainService,
    public dialog: MatDialog,
    public cs: CartService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.currentPageIndex = 1;
  }

  getProducts() {
    this.isLoading = true;
    this.ms.getAllList().subscribe(
      data => {
        if (data.data) {
          console.log(data);
          this.paymentData = data.paymentData;
          window.localStorage.setItem('paymentData', JSON.stringify(this.paymentData[0]));
          this.totalRecords = Object.keys(data.data).length;
          this.getPageNumberArray();
          this.allData = data.data;
          this.originalData = data.originalData;
          this.getCurrentData(1);
          this.isLoading = false;
        }
      }
    );
  }

  getCurrentData(pageNum) {
    this.currentData = [];
    console.log("current page number...", this.currentPageIndex);
    let keys = Object.keys(this.allData);
    let values = Object.values(this.allData);
    if (this.totalRecords > pageNum * 12) {
      let firstIndex = (pageNum - 1) * 12 + 1;
      let lastIndex = firstIndex + 12;
      let filteredKeys = keys.slice(firstIndex, lastIndex);
      let filteredValues = values.slice(firstIndex, lastIndex);
      filteredKeys.forEach((ele, index) => {
        let data = {
          name: ele,
          data: filteredValues[index]
        };
        this.currentData.push(data);
      });
      console.log("cur data..", this.currentData);
      this.isNextAvailable = true;
    } else {
      let firstIndex = (pageNum - 1) * 12 + 1;
      let lastIndex = keys.length;
      let filteredKeys = keys.slice(firstIndex, lastIndex);
      let filteredValues = values.slice(firstIndex, lastIndex);
      filteredKeys.forEach((ele, index) => {
        let data = {
          name: ele,
          data: filteredValues[index]
        };
        this.currentData.push(data);
      });
      this.isNextAvailable = false;
    }
  }

  goNextPage() {
    this.currentPageIndex++;
    this.getCurrentData(this.currentPageIndex);
  }

  goPreviousPage() {
    this.currentPageIndex--;
    this.getCurrentData(this.currentPageIndex);
  }

  getPageNumberArray() {
    this.pageNumArr = [];
    let pages = this.totalRecords / 12 + 1;
    pages = Math.floor(pages) + 1;
    for (let i = 1; i < pages; i++) {
      this.pageNumArr.push(i);
    }
  }

  sortData() {
    console.log("sort...", this.sortKey);
    const orderKeys = (o, f) => {
      var os = [], ks = [], i;
      for (i in o) {
        os.push([i, o[i]]);
      }
      os.sort(function (a, b) { return f(a[1], b[1]); });
      for (i = 0; i < os.length; i++) {
        ks.push(os[i][0]);
      }
      return ks;
    };
    // console.log(this.allData)
    switch (this.sortKey) {
      case 'name':
        // this.allData.sort((a, b) => {
        //   if (a.name > b.name) return true;
        // });
        Object.keys(this.allData).sort();
        break;
      case 'buy':

        break;
    }
  }

  getFilteredByCategory(item) {
    if (!item.isFiltered) {
      this.categories.forEach(ele => ele.isFiltered = false);
      item.isFiltered = !item.isFiltered;
      if (item.isFiltered) {
        let aa = this.originalData.filter(ele => ele.Category.trim() === item.name.trim());
        this.allData = groupBy(aa, 'Name');
        this.totalRecords = Object.keys(this.allData).length;
        this.getPageNumberArray();
        this.currentPageIndex = 1;
        this.getCurrentData(1);
      }
    } else {
      this.categories.forEach(ele => ele.isFiltered = false);
      this.allData = groupBy(this.originalData, 'Name');
      this.totalRecords = Object.keys(this.allData).length;
      this.getPageNumberArray();
      this.currentPageIndex = 1;
      this.getCurrentData(1);
    }
  }

  getCapitalizedName(name) {
    let newName = ''
    if (name) {
      newName = name[0].toUpperCase() + name.substring(2, name.length);
    }
    return newName;
  }
  viewProductDetail(list) {
    // console.log("list=>", list);
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '480px',
      // height: '300px',
      data: {list: list, paymentData: this.paymentData},
      panelClass: 'product-detail'
    });
  }

  getImage(list, data) {
    let image = '';
    if (list.Image) {
      image = list.Image;
    } else {
      if (list['Closet Image']) {
        image = list['Closet Image'];
      } else {
        if (list['Inventory Image']) {
          image = list['Inventory Image'];
        } else {
          data.forEach(ele => {
            if (ele.Image) {
              image = ele.Image;
            }
          });
          if (!image) {
            data.forEach(ele => {
              image = ele['Closet Image'];
            })
          }
          if (!image) {
            data.forEach(ele => {
              image = ele['Inventory Image'];
            });
          }
        }
      }
    }
    return image;
  }

  searchProduct() {
    console.log(this.searchWord);
    let aa = this.originalData.filter(ele => ele.Name.toUpperCase().trim().indexOf(this.searchWord.toUpperCase()) !== -1);
    this.allData = groupBy(aa, 'Name');
    this.totalRecords = Object.keys(this.allData).length;
    this.getPageNumberArray();
    this.currentPageIndex = 1;
    this.getCurrentData(1);
  }

  addToCart(item) {
    console.log("added to cart...", item);
    this.cs.cartItems.push(item.data[0]);
    this.toastr.success('Added to Cart!', 'Success', {
      positionClass: 'toast-top-center'
    });
  }
}
