/* eslint-disable complexity */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import showPopup from '../../components/Popup';
import ProductsSearchHeader from './ProductsSearchHeader';
import ProductsList from './ProductsList';
import CentralMessage from './CentralMessage';
import ProductCategoryPickerPopup from './ProductCategoryPickerPopup';
import { ProductCategory } from '../../data/product/category/ProductCategory';
import { DispatchProps, Props, State } from './types';
import vmMapper from './VMMapper';
import ProductsSearchCodeHeader from './ProductsSearchCodeHeader';
import BarcodeSearchHeader from '../../components/BarcodeSearchHeader/BarcodeSearchHeader';
import {
  getProductsAction,
  searchProductByCodeAction,
  searchProductGloballyAction,
  searchProductSByCategoryAction,
  searchProductsByNameAction
} from '../../redux/actions/products';
import { hideScreenLoading, showScreenLoading } from '../../redux/actions/main';
import { RootState } from '../../redux/reducers';

class Products extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchGlobally: null,
      error: null,
      allProducts: null,
      searchBoxVisible: false,
      searchBoxProductCodeVisible: false,
      categoryPickerPopupVisible: false,
      searchByName: null,
      searchByProductCode: null,
      searchByCategory: null,
      barcodeNo: ''
    };
  }

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = () => {
    const actionCallback = (data: any) => {
      if (data?.error) {
        showPopup({
          title: data.errorMessage ? 'Failed to fetch products' : 'Error',
          message: data.errorMessage ?? 'Failed to fetch products',
          positiveButton: {
            text: 'Retry',
            callback: () => {
              this.props.getProductsAction(actionCallback);
            }
          },
          negativeButtonText: 'Cancel'
        });
      } else {
        if (data.length === 0) {
          this.setState({
            error: 'No products found',
            allProducts: data
          });
        } else {
          this.setState({
            error: null,
            allProducts: data
          });
        }
      }
      this.props.hideScreenLoading();
    };
    this.props.showScreenLoading('Loading..');
    this.props.getProductsAction(actionCallback);
  };

  onSearchByProductNamePress = () => {
    this.setState({
      searchBoxVisible: true
    });
  };

  onSearchByProductCodePress = () => {
    this.setState({
      searchBoxProductCodeVisible: true
    });
  };

  onSearchByCategoryPress = () => {
    this.showCategoryPickerPopup();
  };

  onSearchBoxVisibilityChange = (visible: boolean) => {
    if (!visible) {
      const error = !this.props.products || this.props.products.length === 0 ? 'No products found' : null;
      this.setState({
        error: error,
        searchBoxVisible: false,
        searchBoxProductCodeVisible: false,
        searchByName: null,
        searchByProductCode: null
      });
    }
  };

  onSearchQuerySubmitted = (query: string) => {
    if (!query) {
      showPopup({
        message: 'Search query is empty',
        positiveButton: { text: 'Ok' }
      });
      return;
    }

    if (this.state.searchByName?.query === query) {
      return;
    }

    const actionCallback = (data: any) => {
      if (data?.error) {
        showPopup({
          title: data.errorMessage ? `Failed to load search results with name = "${query}"` : null,
          message: data.errorMessage ?? `Failed to load search results with name = "${query}"`,
          positiveButton: {
            text: 'Retry',
            callback: () => {
              this.props.searchProductsByNameAction(query, actionCallback);
            }
          },
          negativeButtonText: 'Cancel'
        });
      } else {
        if (data.length === 0) {
          this.setState({
            searchByName: {
              query: query,
              results: null
            },
            error: `No search results found for product name "${query}"`
          });
        } else {
          this.setState({
            searchByName: {
              query: query,
              results: data
            },
            error: null
          });
        }
        this.props.hideScreenLoading();
      }
    };

    this.props.searchProductsByNameAction(query, actionCallback);
  };

  onSearchProductCodeQuerySubmitted = (query: string) => {
    if (!query) {
      showPopup({
        message: 'Search query is empty',
        positiveButton: { text: 'Ok' }
      });
      return;
    }

    if (this.state.searchByProductCode?.query === query) {
      return;
    }

    const actionCallback = (data: any) => {
      if (data?.error) {
        showPopup({
          title: data.errorMessage ? `Failed to load search results with code = "${query}"` : null,
          message: data.errorMessage ?? `Failed to load search results with code = "${query}"`,
          positiveButton: {
            text: 'Retry',
            callback: () => {
              this.props.searchProductByCodeAction(query, actionCallback);
            }
          },
          negativeButtonText: 'Cancel'
        });
      } else {
        if (data.length === 0) {
          this.setState({
            searchByProductCode: {
              query: query,
              results: null
            },
            error: `No search results found for product name "${query}"`
          });
        } else {
          this.setState({
            searchByProductCode: {
              query: query,
              results: data
            },
            error: null
          });
        }
        this.props.hideScreenLoading();
      }
    };

    this.props.searchProductByCodeAction(query, actionCallback);
  };

  onCategoryChosen = (category: ProductCategory) => {
    this.hideCategoryPickerPopup();

    const actionCallback = (data: any) => {
      if (data?.error) {
        showPopup({
          title: data.errorMessage ? `Failed to load search results for products in category = ${category.name}` : null,
          message: data.errorMessage ?? `Failed to load search results for products in category = ${category.name}`,
          positiveButton: {
            text: 'Retry',
            callback: () => {
              this.props.searchProductSByCategoryAction(category, actionCallback);
            }
          },
          negativeButtonText: 'Cancel'
        });
      } else {
        if (data.length === 0) {
          this.setState({
            error: `No products found in category "${category.name}"`,
            searchByCategory: {
              category: category,
              results: null
            }
          });
        } else {
          this.setState({
            error: null,
            searchByCategory: {
              category: category,
              results: data
            }
          });
        }
        this.props.hideScreenLoading();
      }
    };

    this.props.searchProductSByCategoryAction(category, actionCallback);
  };

  showCategoryPickerPopup = () => {
    this.setState({
      categoryPickerPopupVisible: true
    });
  };

  hideCategoryPickerPopup = () => {
    this.setState({
      categoryPickerPopupVisible: false
    });
  };

  onBackButtonPress = () => {
    const currState = this.state;
    if (currState.searchByCategory) {
      this.setState({
        error: null,
        searchByCategory: null
      });
    } else {
      this.props.navigation.back();
    }
  };

  onSearchTermSubmit = (query: string) => {
    // handleBarcodeScan(barcodeNo);
    console.log('this.state :', this.state.allProducts);
    if (!query) {
      this.setState({
        searchByProductCode: {
          query: '',
          results: this.state.allProducts
        }
      });
      // showPopup({
      //   message: 'Search query is empty',
      //   positiveButton: {text: 'Ok'},
      // });
    }
    const actionCallback = (data: any) => {
      if (data?.error) {
        showPopup({
          title: data.errorMessage ? `Failed to load search results with value = "${query}"` : null,
          message: data.errorMessage ?? `Failed to load search results with value = "${query}"`,
          positiveButton: {
            text: 'Retry',
            callback: () => {
              this.props.searchProductGloballyAction(query, actionCallback);
            }
          },
          negativeButtonText: 'Cancel'
        });
      } else {
        if (data.length === 0) {
          this.setState({
            searchByProductCode: {
              query: query,
              results: null
            },
            error: `No search results found for product name "${query}"`
          });
        } else {
          this.setState({
            searchByProductCode: {
              query: query,
              results: data
            },
            error: null
          });
        }
        this.props.hideScreenLoading();
      }
    };

    this.props.searchProductGloballyAction(query, actionCallback);
  };

  render() {
    const vm = vmMapper(this.state);
    return (
      <View style={styles.screenContainer}>
        <ProductsSearchHeader
          subtitle={vm.subtitle}
          searchBoxVisible={vm.searchBoxVisible}
          onBackButtonPress={this.onBackButtonPress}
          onSearchQuerySubmitted={this.onSearchQuerySubmitted}
          onSearchBoxVisibilityChange={this.onSearchBoxVisibilityChange}
        />
        <ProductsSearchCodeHeader
          subtitle={vm.subtitle}
          searchBoxProductCodeVisible={vm.searchBoxProductCodeVisible}
          onBackButtonPress={this.onBackButtonPress}
          onSearchProductCodeQuerySubmitted={this.onSearchProductCodeQuerySubmitted}
          onSearchBoxVisibilityChange={this.onSearchBoxVisibilityChange}
        />
        <BarcodeSearchHeader
          autoSearch
          autoFocus
          placeholder={'Search by product code or name'}
          subtitle={vm.subtitle}
          resetSearch={() => null}
          searchBox={false}
          onSearchTermSubmit={this.onSearchTermSubmit}
        />
        <View style={styles.content}>
          <ProductsList
            products={vm.list}
            onProductTapped={(product) => {
              this.props.navigation.navigate('ProductDetails', { product });
            }}
          />
          {vm?.list?.length === 0 && <CentralMessage message={vm.centralErrorMessage} />}
          <ProductCategoryPickerPopup
            visible={vm.categoryPickerPopupVisible}
            onCategoryChosen={this.onCategoryChosen}
            onCancelPressed={this.hideCategoryPickerPopup}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  products: state.productsReducer
});

const mapDispatchToProps: DispatchProps = {
  getProductsAction,
  searchProductsByNameAction,
  searchProductByCodeAction,
  searchProductGloballyAction,
  searchProductSByCategoryAction,
  showScreenLoading,
  hideScreenLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
