    import React, { Component , useState } from 'react';
    import { Input, Segment, Dimmer, Icon, Loader, Menu, Grid, Card, Checkbox } from 'semantic-ui-react';
    import { FAILED, SUCCESS, DISMISS } from '../helpers/constants'
    import { connect } from 'react-redux';
    import { fetchData } from '../redux/actions/config';
    import UserImage from '../assets/myntra.png';
    import GenderMenu from "./Gender";
    import CategoryMenu from "./Categories";
    import BrandMenu from "./Brand";

  //<Icon name='search' style={{paddingLeft: '84px'}} onClick ={this.filterProducts}/>
    const DataLoad = ({
        ...props
    }) => {
        return (
            <Dimmer active={props.active} page style={{ paddingTop: '300px' }}>
            {
                <Loader indeterminate size={'huge'}> Please wait, data is being loaded...</Loader>
            }
            </Dimmer>
        )
    }

    const ProductCard = ({product, Key}) =>{
      let { brand, productName , price } = product;
      return (
        
        <Card  link
            header={brand}
            meta={productName}
            description={[
              'Rs.'+price,
            ].join('')} image={product.images[0].src} />
          );
    }
    class Product extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: false,
                error: false,
                categoryList: [],
                categorySelected: [],
                brandList: [],
                brandSelected: [],
                genderList: [],
                genderSelected: '',
                productList: props.productList
            }
        }
        componentDidMount(){
            this.setState({loading: true});
            this.props.fetchData();
        }
        componentDidUpdate(prevProps){
            if(prevProps.FETCH_DATA_STATUS != SUCCESS && this.props.FETCH_DATA_STATUS === SUCCESS){
                let tempCategoryList = [];
                let tempBrandList = [];
                let tempGenderList = [];
                for(let count =0; count<this.props.productList.length;count++){
                    tempCategoryList.push(this.props.productList[count].category);
                    tempBrandList.push(this.props.productList[count].brand);
                    tempGenderList.push(this.props.productList[count].gender);
                }
                this.setState({  loading: false, 
                    categoryList: [...new Set(tempCategoryList)],
                    brandList: [...new Set(tempBrandList)], 
                    genderList: [...new Set(tempGenderList)],
                    productList: this.props.productList
               });
            }else if(prevProps.FETCH_DATA_STATUS != FAILED && this.props.FETCH_DATA_STATUS === FAILED){
                this.setState({validateAction: {status: FAILED, validateActionMessage: 'Error in authenticating '}, loading: false})
            }
        }
        

        handleChange = ( e, { type, name, value, checked} ) => {
        //   console.log({ type, name, value, checked});

          let { genderSelected, categorySelected, brandSelected } = this.state;

          if(type === 'checkbox' && name === 'categorySelected'){
            if(checked){
              this.setState({ [name] : [...this.state.categorySelected, value] });
              this.filterProducts(genderSelected, [...this.state.categorySelected, value] , brandSelected );
            }else{

              let tempPopValue = this.state.categorySelected;
              tempPopValue = tempPopValue.filter(function(item) {
                  return item !== value
              })
              this.setState({ [name] : tempPopValue });

              console.log(genderSelected, tempPopValue , brandSelected);
              this.filterProducts(genderSelected, tempPopValue , brandSelected );
            }
          }else if(type === 'checkbox' && name === 'brandSelected'){
               
            //   console.log(this.state.brandSelected);
            if(checked){
            
              this.setState({ [name] : [...this.state.brandSelected, value] });
              this.filterProducts(genderSelected, categorySelected , [...this.state.brandSelected, value] );
            }else{
                
              let tempPopValue = this.state.brandSelected;
              tempPopValue = tempPopValue.filter(function(item) {
                  return item !== value
              })
              this.setState({ [name] : tempPopValue });
              this.filterProducts(genderSelected, categorySelected , tempPopValue );
            }
          }else if(type === 'radio'){
            this.setState({ [name] : value });
            this.filterProducts(value, categorySelected , brandSelected);
          }else{
            this.setState({ activeItem: name});
          }
        }

        searchProducts = () => {
            this.setState({ loading:true });
            let { productList } = this.props;  
            console.log("search", this.state.search);
            let filteredProductList = productList.filter((product) => product.product.toLowerCase().includes(this.state.search.toLowerCase()));
            this.setState({ loading:false, productList: filteredProductList });
        }


     filterProducts = ( genderSelected, categorySelected, brandSelected  ) =>{
        // console.log(genderSelected, categorySelected, brandSelected);
      this.setState({ loading:true });
      let { productList } = this.props;
      let filteredProductList = productList.filter((product) => {
        if(genderSelected != '' &&  product.gender === genderSelected ){
          if( categorySelected.length >0 ){
              for(var count=0; count<categorySelected.length; count++){
                if(categorySelected[count] === product.category){
                     if(brandSelected.length >0){
                          //if category, brand and gender all are selected
                          for(var count=0; count<brandSelected.length; count++){
                              if(brandSelected[count] === product.brand){
                                return brandSelected[count] === product.brand;
                              }
                          }

                      }else{
                          // if category and gender is selected
                          if(categorySelected[count] === product.category){
                            return categorySelected[count] === product.category;
                          }
                      }
                }
              }
          }else{
              console.log(brandSelected.length);
              if(brandSelected.length >0){
                // brand and gender selected
                  for(var count=0; count<brandSelected.length; count++){
                    if(brandSelected[count] === product.brand){
                        return brandSelected[count] === product.brand;
                    }
                  }
              }else{
                //no brand selected and no category selected only gender selected

                if(product.gender === genderSelected){
                    return product.gender === genderSelected;
                }
              }
          }
        }else if(genderSelected === ''){
          //no gender selected
           if( categorySelected.length >0 ){

               for(var count=0; count<categorySelected.length; count++){

                 if(categorySelected[count] === product.category){
                      if(brandSelected.length >0){
                           //if category, brand and gender all are selected
                           for(var count=0; count<brandSelected.length; count++){
                             if(brandSelected[count] === product.brand){
                                return brandSelected[count] === product.brand;
                             }
                           }

                       }else{
                           // if category and gender is selected
                           if(categorySelected[count] === product.category){
                            return categorySelected[count] === product.category;
                           }
                       }
                 }
               }
           }else{
               console.log(brandSelected.length);
               if(brandSelected.length >0){
                 // brand is selected
                   for(var count=0; count<brandSelected.length; count++){
                     if(brandSelected[count] === product.brand){
                        return brandSelected[count] === product.brand;
                     }
                   }
               }
           } 
        }

      });
      this.setState({ loading:false, productList: filteredProductList });

     }


     render() {
       const { activeItem, categoryList, brandList, genderList, genderSelected, categorySelected, brandSelected, productList } = this.state

       return (
        <div>
            <DataLoad active={this.state.loading} />
             <Menu secondary>
                <Menu.Item>
                 <img src={UserImage} />
               </Menu.Item>
               <Menu.Item
                     name='men'
                     active={activeItem === 'men'}
                     onClick={this.handleItemClick}
               />
               <Menu.Item
                     name='women'
                     active={activeItem === 'women'}
                     onClick={this.handleItemClick}
               />
               <Menu.Item
                     name='kids'
                     active={activeItem === 'kids'}
                     onClick={this.handleItemClick}
               />
               <Menu.Item
                     name='living'
                     active={activeItem === 'living'}
                     onClick={this.handleItemClick}
               />
               <Menu.Item
                     name='beauty'
                     active={activeItem === 'beauty'}
                     onClick={this.handleItemClick}
               />
               <Menu.Menu position='right'>
                 <Menu.Item>
                    <Input  style={{width:'500px'}} value={this.state.search} onChange={(e) => this.setState({search: e.target.value}, () => {this.searchProducts()}) } placeholder='Search product...' />
                    <Icon name='search' style={{marginLeft:'-20px'}} onClick ={this.searchProducts}  />
                 </Menu.Item>
                 <Menu.Item
                      name='video play'
                      active={activeItem === 'video play'}
                      onClick={this.handleItemClick}
                    >
                      <Icon name='user outline' />
                 </Menu.Item>
                 <Menu.Item
                      name='video play'
                      active={activeItem === 'video play'}
                      onClick={this.handleItemClick}
                    >
                      <Icon name='heart outline' />
                 </Menu.Item>
                 <Menu.Item
                      name='video play'
                      active={activeItem === 'video play'}
                      onClick={this.handleItemClick}
                    >
                      <Icon name='shopping bag' />
                 </Menu.Item>
               </Menu.Menu>
             </Menu>
             <Grid>
                <Grid.Column width={3}>
                 <Menu vertical style={{height:'815px'}}>
                   <Menu.Item>
             
                     <Menu.Menu style={{height:'100px'}}>
                        
                        {
                            (genderList != undefined ) && (
                              genderList.map((gender, key)=>{
                                  return(<GenderMenu 
                                   Key={key}
                                   gender={gender} 
                                   genderSelected={genderSelected} 
                                   handleChange={this.handleChange}
                                />)
                            })
                          )
                        }
                     </Menu.Menu>
                   </Menu.Item>

                   <Menu.Item>
                     <Menu.Header >CATEGORIES</Menu.Header>

                     <Menu.Menu style={{height:'300px', overflowY : 'auto'}}>
                        {
                            (categoryList != undefined ) && (
                              categoryList.map((category, key)=>{
                                  return(<CategoryMenu 
                                          Key={key} 
                                          category={category} 
                                          categorySelected={categorySelected}
                                          handleChange={this.handleChange}/>)
                            })
                          )
                        }
                     </Menu.Menu>
                   </Menu.Item>

                   <Menu.Item>
                     <Menu.Header>BRAND</Menu.Header>
                     <Menu.Menu style={{height:'300px', overflowY : 'auto'}}>
                   
                        {
                            (brandList != undefined ) && (
                              brandList.map((brand, key)=>{
                                  return(<BrandMenu 
                                          Key={key} 
                                          brand={brand}
                                          brandSelected = {brandSelected}
                                          handleChange ={this.handleChange}
                                          />)
                            })
                          )
                        }
                    </Menu.Menu>
                   </Menu.Item>
                 </Menu>
                </Grid.Column>

                <Grid.Column stretched width={13}>
                  <Segment>
                        <Card.Group itemsPerRow={5}>
                            {
                                (productList != undefined ) && (
                                  productList.slice(0,30).map((product, key)=>{
                                      return(<ProductCard Key={key} product={product} />)
                                })
                              )
                            }
                        </Card.Group>
                  </Segment>
                </Grid.Column>
              </Grid>
          </div>
       )
     }
    }
    const mapStateToProps = (state) => {
        return {
            FETCH_DATA_STATUS : state.config.meta.FETCH_DATA_STATUS,
            apiData : state.config.data.apiData,
            productList: state.config.data.apiData.products
        }
    }

    const mapDispatchToProps = {
       fetchData
    }

export default connect(mapStateToProps, mapDispatchToProps)(Product)