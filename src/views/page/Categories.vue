<script setup>
	import { useQuery } from "@tanstack/vue-query"
    import { ref } from "vue"
	import agent from '@/app/agent.js'

	const fetchData = async () => {       
            const res = await  agent.Categories.get()
        	
        	console.log(res)
        	return res
	}
 
 
	const { isLoading, data, error, isError } = useQuery({
		queryKey: ["Categories"],
		queryFn: () => fetchData(),  
		keepPreviousData: true 
	})
	console.log(data)
    const modalVisible = ref(true)
</script>

<template>
    <section class="content-main">
        <div class="content-header">
            <div>
                <h2 class="content-title card-title">Ibommarket Categories</h2>
                <p>Manage ibommarket categories here.</p>
            </div>
            <div> 
                <div @click="modalVisible = true" class="btn btn-primary btn-sm rounded">Create new</div>
            </div>
        </div>
        <div class="card mb-4">
            <header class="card-header">
                <div class="row gx-3">
                    <div class="col-lg-4 col-md-6 me-auto">
                        <input type="text" placeholder="Search..." class="form-control" />
                    </div>
                    <div class="col-lg-2 col-6 col-md-3">
                        <select class="form-select">
                            <option>Latest added</option>
                            <option>Cheap first</option>
                            <option>Most viewed</option>
                        </select>
                    </div>
                </div>
            </header>
            <!-- card-header end// -->
            <div class="card-body">
                <div class="row gx-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5"> 
                	<template v-if="!isError && !isLoading ">
                		
                    	<div v-for="category in data" :key="category.Id" class="col">
	                        <div class="card card-product-grid">
	                        	<div class="id">
	                        		{{category.Id}}
	                        	</div>
	                            <div class="img-wrap"> 
	                            	<img :src="category.ImageUrl" alt="Product" /> 
	                            </div>
	                            <div class="info-wrap">
	                                <div class="title text-truncate"> {{ category.Name }} </div>
	                                 
	                                <div class="btn btn-sm font-sm rounded btn-brand"> <i class="material-icons md-edit"></i> Edit </div>
	                                <div class="btn btn-sm font-sm btn-light rounded"> <i class="material-icons md-delete_forever"></i> Delete </div>
	                            </div>
	                        </div>
                        <!-- card-product  end// -->
                    	</div> 
                	</template>

                </div>
                <!-- row.// -->
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

        <a-modal
          :footer = "null"
          v-model:open="modalVisible"
          @afterClose = "modalVisible = false"
          title="Add category"
          centered 
          style="padding: 20px 10px;"
        > 
                
        </a-modal>
    </section>
</template>
<style scoped>
	.card-product-grid {
		position: relative;
	}
	div.id {
		position: absolute;
	    left: 0;
	    top: 0;
	    font-size: 15px;
	    font-weight: bold;
	    z-index: 3;
	    padding: 3px 15px;
	    background: #3bb77e;
	    border-top-left-radius: 4px;
	    color: #fff;

	}
</style>