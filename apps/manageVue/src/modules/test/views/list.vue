<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />

			<!-- 搜索 -->
			<cl-search ref="Search" />

		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'test-list'
});

import { useCrud, useSearch, useTable, useUpsert } from '@cool-vue/crud';
import { useI18n } from 'vue-i18n';
import { useCool } from '/@/cool';
import { reactive } from 'vue';

const { t } = useI18n();
const { service } = useCool();

const options = reactive({

	type: [
		{
			label: t('衣服'),
			value: 0,
			type: 'info'
		},
		{
			label: t('鞋子'),
			value: 1,
			type: 'success'
		}
	],
	status: [
		{
			label: t('禁用'),
			value: 0,
			type: 'danger'
		},
		{
			label: t('正常'),
			value: 1,
			type: 'success'
		},
		{
			label: t('已注销'),
			value: 2,
			type: 'warning'
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{
			type: 'selection',
			width: 60
		},
		{
			label: t('标题'),
			prop: 'title',
			minWidth: 150
		},
		{
			label: t('图片'),
			prop: 'pic',
			minWidth: 100,
			component: {
				name: 'cl-avatar'
			}
		},
		{
			label: t('价格'),
			prop: 'price',
			minWidth: 120
		},
		{
			label: t('分类'),
			prop: 'type',
			minWidth: 120,
			dict: options.type,
		},
		{
			label: t('状态'),
			prop: 'status',
			minWidth: 120,
			dict: options.status
		},
		{
			label: t('创建时间'),
			prop: 'createTime',
			sortable: 'desc',
			minWidth: 170
		},
		{
			type: 'op'
		}
	]
});

// cl-upsert
const Upsert = useUpsert({
	items: [

		{
			prop: 'title',
			label: t('标题'),
			component: { name: 'el-input' },
			required: true
		},
		{
			prop: 'pic',
			label: t('图片'),
			component: { name: 'cl-upload' }
		},
		{
			prop: 'price',
			label: t('价格'),
			component: {
				name: 'el-input',
				type: 'number',
				props: {
					maxlength: 11
				}
			}
		},
		{
			prop: 'type',
			label: t('分类'),
			value: 1,
			component: {
				name: 'el-radio-group',
				options: options.type
			}
		},
		{
			prop: 'status',
			label: t('状态'),
			value: 1,
			component: {
				name: 'el-radio-group',
				options: options.status
			}
		}
	]
});

// cl-search
const Search = useSearch();


console.log(Search);
// cl-crud
const Crud = useCrud(
	{
		service: service.test.goods
	},
	app => {
		app.refresh();
	}
);
</script>
