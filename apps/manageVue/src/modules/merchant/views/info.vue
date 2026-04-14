<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 条件搜索 -->
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
	name: "merchant-info",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { reactive, h } from "vue";

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	status: [
		{ label: t("禁用"), value: 0, type: "danger" },
		{ label: t("启用"), value: 1, type: "success" },
	],
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("商户名称"),
			prop: "name",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("小程序 appId"),
			prop: "appId",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("小程序 appSecret"),
			prop: "appSecret",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("商户号"),
			prop: "mchid",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("APIv3密钥"),
			prop: "v3Key",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("证书 apiclientCert"),
			prop: "apiclientCert",
			component: {
				name: "el-input",
				props: { type: "textarea", rows: 4 },
			},
			required: true,
		},
		{
			label: t("秘钥 apiclientKey"),
			prop: "apiclientKey",
			component: {
				name: "el-input",
				props: { type: "textarea", rows: 4 },
			},
			required: true,
		},
		{
			label: t("备注"),
			prop: "remark",
			component: {
				name: "el-input",
				props: { type: "textarea", rows: 4 },
			},
		},
		// {
		// 	label: t("状态"),
		// 	prop: "status",
		// 	component: { name: "el-radio-group", options: options.status },
		// 	value: 1,
		// 	required: true,
		// },
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("商户名称"), prop: "name", minWidth: 140 },
		{ label: t("应用ID"), prop: "appId", minWidth: 160 },
		{ label: t("应用密钥"), prop: "appSecret", minWidth: 140 },
		{ label: t("商户号"), prop: "mchid", minWidth: 140 },
		{ label: t("APIv3密钥"), prop: "v3Key", minWidth: 140 },
		{
			label: t("证书"),
			prop: "apiclientCert",
			width: 200,
			formatter: (row, column, cellValue) => {
				return h('div', {
					class: 'text-ellipsis'
				}, cellValue);
			}
		},
		{
			label: t("秘钥"),
			prop: "apiclientKey",
			width: 200,
			formatter: (row, column, cellValue) => {
				return h('div', {
					class: 'text-ellipsis'
				}, cellValue);
			}
		},
		{
			label: t("备注"),
			prop: "remark",
			width: 200,
			formatter: (row, column, cellValue) => {
				return h('div', {
					class: 'text-ellipsis'
				}, cellValue);
			}
		},
		// {
		// 	label: t("状态"),
		// 	prop: "status",
		// 	minWidth: 100,
		// 	component: { name: "cl-switch" },
		// 	dict: options.status,
		// },
		{
			label: t("创建时间"),
			prop: "createTime",
			minWidth: 170,
			sortable: "desc",
			component: { name: "cl-date-text" },
		},
		{
			label: t("更新时间"),
			prop: "updateTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
		},
		{ type: "op", buttons: ["edit", "delete"] },
	],
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.merchant.info,
	},
	(app) => {
		app.refresh();
	},
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
