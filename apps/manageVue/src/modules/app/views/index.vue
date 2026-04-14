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
	name: "app-info",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	type: [
		{ label: t("小程序"), value: 0 },
		// { label: t("H5"), value: 1 },
		// { label: t("PC端"), value: 2 },
	],
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{ label: t("Logo"), prop: "logo", component: { name: "cl-upload" } },
		{
			label: t("应用类型"),
			prop: "type",
			component: { name: "el-radio-group", options: options.type },
			required: true,
		},
		{
			label: t("应用名称"),
			prop: "appName",
			component: { name: "el-input", props: { clearable: true } },
			span: 24,
			required: true,
		},
		{
			label: t("简介"),
			prop: "description",
			component: { name: "el-input", props: { clearable: true } },
		},
		{
			label: t("分享标题"),
			prop: "shareTitle",
			component: { name: "el-input", props: { clearable: true } },
			span: 24,
		},


		{
			label: t("分享图标"),
			prop: "shareIcon",
			component: { name: "cl-upload" },
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{
			label: t("Logo"),
			prop: "logo",
			minWidth: 100,
			component: { name: "cl-image", props: { size: 60 } },
		},
		{ label: t("应用名称"), prop: "appName", minWidth: 140 },
		{
			label: t("简介"),
			prop: "description",
			showOverflowTooltip: true,
			minWidth: 200,
		},
		{
			label: t("应用类型"),
			prop: "type",
			minWidth: 120,
			dict: options.type,
		},
		{ label: t("分享标题"), prop: "shareTitle", minWidth: 140 },
		{
			label: t("分享图标"),
			prop: "shareIcon",
			minWidth: 100,
			component: { name: "cl-image", props: { size: 60 } },
		},
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
		service: service.app.info,
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
