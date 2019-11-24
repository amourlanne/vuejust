<template>
  <div class="organization-users">
    <Helmet>
      <title>Users</title>
    </Helmet>
    <div class="container">
      <div class="row">
        <div class="col">
          <vuetable ref="vuetable"
                    :api-mode="false"
                    :fields="fields"
                    :muti-sort="true"
                    :css="css.table"
                    :per-page="perPage"
                    :data-manager="dataManager"
                    pagination-path="pagination"
                    @vuetable:pagination-data="onPaginationData"
          >
            <template slot="actions" slot-scope="props">
              <div class="custom-actions">
                <button class="btn btn-primary btn-sm"
                        @click="onActionClicked('view-item', props.rowData, props.rowIndex)">
                  <i class="zoom icon"></i>View
                </button>
                <button class="btn btn-success btn-sm"
                        @click="onActionClicked('edit-item', props.rowData, props.rowIndex)">
                  <i class="edit icon"></i>Edit
                </button>
                <button class="btn btn-danger btn-sm"
                        @click="onActionClicked('delete-item', props.rowData, props.rowIndex)">
                  <i class="fa fa-delete"></i>Delete
                </button>
              </div>
            </template>

          </vuetable>
          <vuetable-pagination-info
                  ref="paginationInfo">
          </vuetable-pagination-info>
          <vuetable-pagination
                  ref="pagination"
                  :css="css.pagination"
                  @vuetable-pagination:change-page="onChangePage">
          </vuetable-pagination>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Add user
          </button>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Modal title
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                  eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import userService from '@/services/user.service';
// @ts-ignore
import { Helmet } from '@jnields/vue-helmet';
import _ from 'lodash';
import vuetableCss from "../../../../config/vuetable-css";
export default Vue.extend({
  name: 'users',
  components: { Helmet },
  data() {
    return {
      fields: [
        'username',
        'firstName',
        'lastName',
        'email',
        'activated',
        {
          name: 'actions',
          title: 'Actions',
        },
      ],
      css: vuetableCss,
      data: [],
      perPage: 5
    };
  },
  watch: {
    data(newVal, oldVal) {
      // @ts-ignore
      this.$refs.vuetable.refresh();
    }
  },
  async beforeMount() {
    try {
      // @ts-ignore
      this.data = await userService.getAll();
    } catch (e) {
      // console.log(e);
    }
  },
  methods: {
    onPaginationData(paginationData) {
      // @ts-ignore
      this.$refs.pagination.setPaginationData(paginationData);
      // @ts-ignore
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage(page) {
      // @ts-ignore
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder, pagination) {
      if (this.data.length < 1) return;

      let local = this.data;

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        // @ts-ignore
        local = _.orderBy(
                local,
                sortOrder[0].sortField,
                sortOrder[0].direction
        );
      }
// @ts-ignore
      pagination = this.$refs.vuetable.makePagination(
              local.length,
              this.perPage
      );
      console.log('pagination:', pagination)
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        // @ts-ignore
        data: _.slice(local, from, to)
      };
    },
    onActionClicked(action, data, rowIndex) {
      console.log("slot actions: on-click", action, data, rowIndex);
    }
  }
});
</script>

<style lang="scss"></style>
