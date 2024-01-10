<script setup>
    import { ref } from "vue";
    import agent  from "@/app/agent.js";
	import { useQuery } from "@tanstack/vue-query" 

    const fetchData = async () => {   
        try {
            const res = await  agent.Properties.get()
        	console.log(res)
        	return res
        } catch (err) {
            console.log(err)
        	return []
        }
	}
    const pageNumber = ref(1)
	const { isLoading, data, error, isError } = useQuery({
		queryKey: ["Posts" , pageNumber.value],
		queryFn: () => fetchData(),  
		keepPreviousData: true 
	}) 
    function formartPrice (price) {
        return "₦  " + price.toLocaleString()
    }
    const detailModalOpened = ref(false)  
    const showModal = () => {
      open.value = true;
    }
    const handleOk = e => {
      console.log(e)
      open.value = false
    }
    const detailsIndex = ref(null)

    function openDetailsModal(argument, index) {
        detailsIndex.value = index
        detailModalOpened.value = true
        console.log(argument)
    }
    const userDateFilterValue = ref(null)

    function handleDateChange () {
        console.log(userDateFilterValue.value)
    }
     function separatePascalCase(inputStr) {
        const words = inputStr.match(/[A-Z][a-z]*/g);
        return words.join(' ');
    }
    const openedDetailsMenuIndex = ref(null)
    function handleMenuClicked(index) {
        console.log(index)
        if ( index !== openedDetailsMenuIndex.value) {
            openedDetailsMenuIndex.value = index
        } else {
            openedDetailsMenuIndex.value = null
        }
    }
</script>

<template>
    <section class="content-main">
                <div class="content-header">
                    <div>
                        <h2 class="content-title card-title">Products List</h2>
                        <p>Manage Ibommarket products.</p>
                    </div>
                    
                </div>
                <div class="card mb-4">
                    <header class="card-header">
                        <div class="row align-items-center">
                            <!-- <div class="col col-check flex-grow-0">
                                <div class="form-check ms-2">
                                    <input class="form-check-input" type="checkbox" value="" />
                                </div>
                            </div> -->
                            <div class="col-md-3 col-12 me-auto mb-md-0 mb-3">
                                <select class="form-select">
                                    <option selected>All category</option>
                                    <option>Electronics</option>
                                    <option>Clothes</option>
                                    <option>Automobile</option>
                                </select>
                            </div>
                            <div class="col-md-2 col-6">
                                <input @change="handleDateChange" v-model="userDateFilterValue" type="date" value="02.05.2021" class="form-control" />
                            </div>
                            <div class="col-md-2 col-6">
                                <select class="form-select">
                                    <option value="" selected>Status</option>
                                    <option value="0">Active</option>
                                    <option value=1>Pending</option>
                                    <option value="2">Rejected</option>
                                </select>
                            </div>
                        </div>
                    </header>
                    <!-- card-header end// -->
                    <div class="card-body">
                        <article v-for="(card, index) in data" class="itemlist">
                            <div class="row align-items-center">
                                <!-- <div class="col col-check flex-grow-0">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" />
                                    </div>
                                </div> -->
                                <div class="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                                    <a class="itemside" href="#">
                                        <div class="left">
                                            <img style="width: 60px; height: 60px; object-fit: cover;" :src="card.CoverImageUrl" class="img-sm img-thumbnail" alt="Item" />
                                        </div>
                                        <div class="info">
                                            <h6 class="mb-0">{{ card.Title }}</h6>
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-2 col-sm-2 col-4 col-price"><span> {{ formartPrice(card.Price) }} </span></div>
                                <div class="col-lg-2 col-sm-2 col-4 col-status">
                                    <span class="badge rounded-pill alert-success">Active</span>
                                </div>
                                <div class="col-lg-2 col-sm-3 col-4 col-date">
                                    <span> {{ new Date(card.DateCreated).toLocaleString() }} </span>
                                </div>
                                <div class="col-lg-2 col-sm-3 col-4 col-date text-end">
                                            <div class="btn btn-md rounded font-sm" :class="{ show : openedDetailsMenuIndex == index }" @click="openDetailsModal(true,index )">Detail</div>
                                            <div class="dropdown">
                                                <div @click="handleMenuClicked(index)" data-bs-toggle="dropdown" class="btn btn-light rounded btn-sm font-sm"> <i class="material-icons md-more_horiz"></i> </div>
                                                <div  :class="{ show : openedDetailsMenuIndex == index }" class="dropdown-menu">
                                                    <div class="dropdown-item" @click="openDetailsModal(true,index )">View detail</div>
                                                    <div class="dropdown-item" >Accept</div>
                                                    <div class="dropdown-item text-warn" >Reject</div>
                                                    <div class="dropdown-item text-danger" >Delete</div>
                                                </div>
                                            </div>
                                            <!-- dropdown //end -->
                                </div>
                            </div>
                            <!-- row .// -->
                        </article>
                        <!-- itemlist  .// --> 
                    </div>
                    <!-- card-body end// -->
                </div>
                <!-- card end// -->
                <div class="pagination-area mt-30 mb-50">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-start">
                            <li class="page-item active"><a class="page-link" href="#">01</a></li>
                            <li class="page-item"><a class="page-link" href="#">02</a></li>
                            <li class="page-item"><a class="page-link" href="#">03</a></li>
                            <li class="page-item"><a class="page-link dot" href="#">...</a></li>
                            <li class="page-item"><a class="page-link" href="#">16</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#"><i class="material-icons md-chevron_right"></i></a>
                            </li>
                        </ul>
                    </nav>
                </div>
    </section>

    <a-modal :footer="null" v-model:open="detailModalOpened" width="1000px" wrap-class-name="full-modal" title="Post details"> 
        <section class="content-main">
           
            <div class="content-header">
                <div>
                    <h2 class="content-title card-title"> {{ data[detailsIndex].Title }} </h2>
                    <p>token : {{ data[detailsIndex].Token }}</p>  
                    <h5 class="content-title card-title"> Category : {{ data[detailsIndex].CategoryId }} </h5>
                    <h5 class="content-title card-title"> sub Catrgory : {{ data[detailsIndex].SubcategoryId }} </h5> 
                    <h5 class="content-title card-title"> Price : {{ formartPrice(data[detailsIndex].Price)  }} </h5> 


                </div>
            </div>
            <div class="row">
                <div class="card-body">
                    <div class="row gx-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5"> 
                        <template v-if="!isError && !isLoading ">
                            <!-- <template  v-for="category in data"> -->
                                 
                            <div v-for="image in data[detailsIndex].PropertyPhotos" :key="image.Id" class="col">
                                <div class="card card-product-grid"> 
                                    <div class="img-wrap"> 
                                        <img :src="image.Url" alt="Product" /> 
                                    </div> 
                                </div>
                            <!-- card-product  end// -->
                            </div> 
                            <!-- </template> -->

                        </template>

                    </div>
                    <!-- row.// -->
                </div>
            </div>
            <h5 class="content-title card-title"> Location : {{ data[detailsIndex].Location }} </h5> 
            <h5 class="content-title card-title"> Address : {{ data[detailsIndex].PropertyAddress }} </h5> 
            <h5 class="content-title card-title"> Description : {{ data[detailsIndex].Description }} </h5> 
            <div class="grid-details">
                
            <template v-for="(unique, key) in data[detailsIndex].Unique">
                  <div v-if ="unique" class="grid-details-item unique-block" > 
                    <span class="key"> {{ separatePascalCase(key) }} </span>
                    <span class="value" v-if="typeof unique === 'number' " > {{ unique }} 
                      {{ key === "SquareMeters" ? "sqm" : ""  }}
                    </span>

                    <template v-if="typeof unique === 'string' ">
                      <span class="value" v-if="! unique.includes('[') "> {{ unique }} </span>
                      <template v-else>
                        <div >
                          
                          <template v-for="(value, indexof , parent) in JSON.parse( unique )">
                            <span v-if="indexof !== JSON.parse(unique).length - 1">
                                {{ value }} ,
                              
                            </span>
                            <span v-else> {{ value }} </span>
                          </template>
                        </div>
                      </template>
                    </template>
                  </div>
              </template>
            </div>

        </section>
    </a-modal>

    </template>
    <style lang="less">
    .full-modal {
    .ant-modal { 
    top: 30px; 
    }
    .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: 90vh; 
    overflow-y: scroll;
  }
  .ant-modal-body {
    flex: 1;
  }
}
 .img-wrap img {
    display: none;
 } 
</style>
<style scoped>
    .card-product-grid {
        max-height: 150px;
        min-height: 150px;
    }
.grid-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap : 15px 0;
    margin: 25px 0
  }
  .grid-details-item {
    display: flex;
    flex-direction: column;
  }
  .grid-details-item span.value {
    font-size: 15px;
    /*font-weight: bold;*/
  }
  .grid-details-item span.key {
    color: #6c8ea0;
    font-size: 12px;
    margin-bottom: 7px;
    text-transform: uppercase;
  }
  .dropdown-menu {
    left: -90px;
    min-width: 8rem;
  }
</style>