import React from 'react';
import CategoryList from './CategoryList';
import NewProductForm from '../product/NewProductForm.js'
import ProductDetail from '../product/ProductDetail'

class CategoryControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      selectedProduct: null,
      categoryVisibleOnPage: 0,
      masterProductList: [
      {
        category: "Engine Parts",
        selection: [
          { prodName: "3A Thrusters", prodDescription: "Thrusters are what propels a ship when flying in normal space.", prodQuantity: 1 },
          { prodName: "Warp Converter", prodDescription: "A spacecraft equipped with a warp drive may travel at speeds greater than that of light by many orders of magnitude.", prodQuantity: 4 }
        ]
      },
      {
        category: "Hardpoints",
        selection: [{ prodName: "Pulse Laser", prodDescription: "Blasters!", prodQuantity: 3 }]
      },
      {
        category: "Ship Armor",
        selection: [{ prodName: "Titanium Plate", prodDescription: "Ship Armor", prodQuantity: 4 }]
      },
      {
        category: "Utility Mounts",
        selection: [{ prodName: "Detailed Surface Scanner", prodDescription: "Scans Planets", prodQuantity: 5 }]
      },
      {
        category: "Shield Generators",
        selection: [{ prodName: "4E Shield Generator", prodDescription: "Protect your shiiit", prodQuantity: 4 }]
      },
      {
        category: "Internal compartments",
        selection: [{ prodName: "6B Cargo Hold", prodDescription: "Hold your shiiit", prodQuantity: 5 }]
      }]
    };
  }

    handleClickForm = () => {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  

  handleClickUp = () => {
    if (this.state.categoryVisibleOnPage >= 5) {
      this.setState({ categoryVisibleOnPage: 0 })
    }
    else {
      this.setState(prevState => ({
        categoryVisibleOnPage: prevState.categoryVisibleOnPage + 1
      }))
    }
  }

  handleClickDown = () => {
    if (this.state.categoryVisibleOnPage <= 0) {
      this.setState({ categoryVisibleOnPage: 5 })
    }
    else {
      this.setState(prevState => ({
        categoryVisibleOnPage: prevState.categoryVisibleOnPage - 1
      }));
    }
  }

  handleChangingSelectedProduct = (id) => {
    const selectedProduct = this.state.masterProductList.filter(pro => pro.id === id)[0];
    this.setState({selectedProduct: selectedProduct});
  }

  handleAddingNewProductToList = (newProduct) => {
    const clone = [...this.state.masterProductList]
    const newSelection = clone[newProduct.prodCategory].selection.concat(newProduct);
    
    clone[newProduct.prodCategory].selection = newSelection;
    this.setState({
      masterProductList: clone,
      formVisibleOnPage: false
    });
  }

  render() {
    let currentVisibleState = null;
    let buttonText = null;

    if (this.state.selectedProduct != null) {
      currentVisibleState = <ProductDetail product = {this.state.selectedProduct} />
      buttonText = "Return to Product List";
    }
    else if (this.state.formVisibleOnPage) {
      currentVisibleState = <NewProductForm onNewProductCreation={this.handleAddingNewProductToList} />;
      buttonText = "Return to Outfitting"
    } else {
      currentVisibleState = <CategoryList
        currentIndex={this.state.categoryVisibleOnPage} availableProducts={this.state.masterProductList} onProductSelection={this.handleChangingSelectedProduct}/>
      buttonText = "Add new Space Product"
    }

    return (
      <React.Fragment>
        <button className="arrow btn btn-outline-light btn-sm" onClick={this.handleClickDown}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg></button>
        <button className="arrow btn btn-outline-light btn-sm" onClick={this.handleClickUp}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
        </svg></button>
        {currentVisibleState}
        <button className="arrow btn btn-outline-info btn-block" onClick={this.handleClickForm}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default CategoryControl;